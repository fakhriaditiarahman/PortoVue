import { watch } from 'vue'
import { useRoute } from 'vue-router'

const SITE_URL = 'https://www.fakhriaditiarahman.engineer'
const DEFAULT_IMAGE = `${SITE_URL}/og-cover.jpg`
const DEFAULT_DESCRIPTION =
    'Portfolio Fakhri Aditia Rahman - Mobile & Web Full Stack Developer. Spesialisasi di Vue.js, Laravel, Flutter, dan React Native. Lihat proyek dan skill saya.'

interface RouteMeta {
    title?: string
    description?: string
    noindex?: boolean
}

function setMeta(attribute: 'name' | 'property', key: string, content: string) {
    let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)
    if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attribute, key)
        document.head.appendChild(element)
    }
    element.setAttribute('content', content)
}

function setCanonical(href: string) {
    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!link) {
        link = document.createElement('link')
        link.rel = 'canonical'
        document.head.appendChild(link)
    }
    link.href = href
}

/**
 * Keeps the document title, description, canonical and social tags in sync
 * with the active route. Runs on every navigation.
 */
export function usePageMeta() {
    const route = useRoute()

    watch(
        () => route.path,
        () => {
            const meta = route.meta as RouteMeta
            const title = meta.title ?? document.title
            const description = meta.description ?? DEFAULT_DESCRIPTION
            const url = `${SITE_URL}${route.path === '/' ? '/' : route.path.replace(/\/$/, '')}`

            document.title = title

            setMeta('name', 'description', description)
            setMeta('name', 'robots', meta.noindex ? 'noindex, follow' : 'index, follow')

            setMeta('property', 'og:title', title)
            setMeta('property', 'og:description', description)
            setMeta('property', 'og:url', url)
            setMeta('property', 'og:image', DEFAULT_IMAGE)
            setMeta('property', 'og:image:alt', 'Fakhri Aditia Rahman — Fullstack Developer')

            setMeta('name', 'twitter:title', title)
            setMeta('name', 'twitter:description', description)
            setMeta('name', 'twitter:image', DEFAULT_IMAGE)

            setCanonical(url)
        },
        { immediate: true }
    )
}
