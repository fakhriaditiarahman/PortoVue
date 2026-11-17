import type { VercelRequest, VercelResponse } from '@vercel/node'

const RESEND_ENDPOINT = 'https://api.resend.com/emails'

const MAX = {
    name: 80,
    email: 120,
    subject: 150,
    message: 5000,
} as const

const RATE_LIMIT = {
    windowMs: 10 * 60 * 1000,
    max: 5,
} as const

const hits = new Map<string, { count: number; resetAt: number }>()

function clientIp(req: VercelRequest): string {
    const forwarded = req.headers['x-forwarded-for']
    if (typeof forwarded === 'string' && forwarded.length) {
        return forwarded.split(',')[0].trim()
    }
    if (Array.isArray(forwarded) && forwarded.length) {
        return forwarded[0]
    }
    return req.socket?.remoteAddress ?? 'unknown'
}

// Only accept submissions coming from the site itself (same host).
function isSameOrigin(req: VercelRequest): boolean {
    const host = req.headers.host
    if (!host) return true

    const candidates = [req.headers.origin, req.headers.referer]
    const present = candidates.filter((value): value is string => typeof value === 'string' && value.length > 0)

    if (!present.length) return true

    return present.some((value) => {
        try {
            return new URL(value).host === host
        } catch {
            return false
        }
    })
}

function isRateLimited(ip: string): boolean {
    const now = Date.now()
    const entry = hits.get(ip)

    if (!entry || entry.resetAt <= now) {
        hits.set(ip, { count: 1, resetAt: now + RATE_LIMIT.windowMs })
        return false
    }

    entry.count += 1

    if (hits.size > 1000) {
        for (const [key, value] of hits) {
            if (value.resetAt <= now) hits.delete(key)
        }
    }

    return entry.count > RATE_LIMIT.max
}

function asString(value: unknown, max: number): string {
    return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

function readBody(raw: unknown): Record<string, unknown> {
    if (typeof raw === 'string') {
        try {
            return JSON.parse(raw) as Record<string, unknown>
        } catch {
            return {}
        }
    }
    return (raw ?? {}) as Record<string, unknown>
}

// Keep header-only values on a single line to avoid header injection.
function asHeader(value: string): string {
    return value.replace(/[\r\n]+/g, ' ')
}

function isValidEmail(value: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST')
        return res.status(405).json({ ok: false, error: 'method_not_allowed' })
    }

    if (!isSameOrigin(req)) {
        return res.status(403).json({ ok: false, error: 'forbidden_origin' })
    }

    if (isRateLimited(clientIp(req))) {
        res.setHeader('Retry-After', String(RATE_LIMIT.windowMs / 1000))
        return res.status(429).json({ ok: false, error: 'rate_limited' })
    }

    const body = readBody(req.body)

    // Honeypot: real users never fill this hidden field. Pretend success.
    if (asString(body['bot-field'], 100)) {
        return res.status(200).json({ ok: true })
    }

    const name = asString(body.name, MAX.name)
    const email = asString(body.email, MAX.email)
    const subject = asString(body.subject, MAX.subject)
    const message = asString(body.message, MAX.message)

    if (!name || !message || !isValidEmail(email)) {
        return res.status(422).json({ ok: false, error: 'invalid_input' })
    }

    const apiKey = process.env.RESEND_API_KEY
    const to = process.env.CONTACT_TO
    const from = process.env.CONTACT_FROM

    if (!apiKey || !to || !from) {
        console.error('contact: missing RESEND_API_KEY / CONTACT_TO / CONTACT_FROM')
        return res.status(500).json({ ok: false, error: 'server_config' })
    }

    try {
        const response = await fetch(RESEND_ENDPOINT, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from,
                to: [to],
                reply_to: email,
                subject: asHeader(subject || `New message from ${name}`),
                text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
            }),
        })

        if (!response.ok) {
            console.error('contact: resend failed', response.status, await response.text())
            return res.status(502).json({ ok: false, error: 'send_failed' })
        }

        return res.status(200).json({ ok: true })
    } catch (error) {
        console.error('contact: resend request error', error)
        return res.status(502).json({ ok: false, error: 'send_failed' })
    }
}
