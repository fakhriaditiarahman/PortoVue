import type { VercelRequest, VercelResponse } from '@vercel/node'

const RESEND_ENDPOINT = 'https://api.resend.com/emails'

const MAX = {
    name: 80,
    email: 120,
    subject: 150,
    message: 5000,
} as const

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
