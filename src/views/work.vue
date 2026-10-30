<template>
    <div class="work-page view-page">
        <header class="work-head">
            <h1 class="title" aria-label="My projects">
                <span class="outline-text" aria-hidden="true">Projects</span>
                <span class="hov" aria-hidden="true">M</span>
                <span class="hov" aria-hidden="true">y</span>
                <span class="space" aria-hidden="true"></span>
                <span class="hov" aria-hidden="true">p</span>
                <span class="hov" aria-hidden="true">r</span>
                <span class="hov" aria-hidden="true">o</span>
                <span class="hov" aria-hidden="true">j</span>
                <span class="hov" aria-hidden="true">e</span>
                <span class="hov" aria-hidden="true">c</span>
                <span class="hov" aria-hidden="true">t</span>
                <span class="hov" aria-hidden="true">s</span>
            </h1>
            <p class="work-intro">
                {{ projects.length }} builds, from school portals to event sites. Open one
                for the stack, the features, and how it was made.
            </p>
        </header>

        <div class="work-index">
            <ol class="project-list">
                <li
                    v-for="(project, index) in projects"
                    :key="project.title"
                    class="project-row"
                    :class="{ active: index === activeIndex }"
                    @mouseenter="activeIndex = index"
                >
                    <div class="row-inner">
                        <span class="row-num" aria-hidden="true">{{ pad(index + 1) }}</span>

                        <div class="row-body">
                            <h2 class="row-title">
                                <button
                                    type="button"
                                    @focus="activeIndex = index"
                                    @click="openDetail(index)"
                                >
                                    {{ project.title }}
                                </button>
                            </h2>

                            <p class="row-meta">
                                <span>{{ project.codeTools.join(' / ') }}</span>
                                <span>{{ yearOf(project.timeline) }}</span>
                            </p>

                            <template v-if="isCompact">
                                <figure class="row-thumb">
                                    <img
                                        :src="getImage(project.img)"
                                        :alt="'Screenshot of ' + project.title"
                                        loading="lazy"
                                        decoding="async"
                                    />
                                </figure>

                                <p class="row-desc">{{ project.description }}</p>

                                <div class="row-actions">
                                    <button
                                        class="btn is-filled"
                                        type="button"
                                        @click="openDetail(index)"
                                    >
                                        Detail
                                    </button>
                                    <a
                                        v-if="project.link"
                                        class="btn"
                                        :href="project.link"
                                        target="_blank"
                                        rel="noopener"
                                    >
                                        Visit
                                    </a>
                                    <a
                                        v-if="project.source"
                                        class="link-action"
                                        :href="project.source"
                                        target="_blank"
                                        rel="noopener"
                                    >
                                        Source Code
                                        <svg
                                            width="12"
                                            height="12"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            aria-hidden="true"
                                        >
                                            <path
                                                d="M8 16 16 8M9 8h7v7"
                                                stroke="currentColor"
                                                stroke-width="1.6"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                        </svg>
                                    </a>
                                    <span v-else class="link-action is-disabled" aria-disabled="true">
                                        Source Code
                                    </span>
                                </div>
                            </template>
                        </div>

                        <span class="row-arrow" aria-hidden="true">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                <path
                                    d="M4 12h15M13 6l6 6-6 6"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                        </span>
                    </div>
                </li>
            </ol>

            <aside v-if="!isCompact" class="work-preview" aria-label="Project preview">
                <div class="preview-frame" aria-hidden="true">
                    <img
                        v-for="(project, index) in projects"
                        :key="project.img"
                        :src="getImage(project.img)"
                        :class="{ 'is-active': index === activeIndex }"
                        alt=""
                        decoding="async"
                    />
                </div>

                <div class="preview-caption">
                    <div class="preview-count">
                        <span>{{ pad(activeIndex + 1) }} / {{ pad(projects.length) }}</span>
                        <span>{{ yearOf(preview.timeline) }}</span>
                    </div>

                    <p class="preview-title">{{ preview.title }}</p>
                    <p class="preview-desc">{{ preview.description }}</p>

                    <div class="preview-actions">
                        <button class="btn is-filled" type="button" @click="openDetail(activeIndex)">
                            Detail
                        </button>
                        <a
                            v-if="preview.link"
                            class="btn"
                            :href="preview.link"
                            target="_blank"
                            rel="noopener"
                        >
                            Visit
                        </a>
                        <a
                            v-if="preview.source"
                            class="link-action"
                            :href="preview.source"
                            target="_blank"
                            rel="noopener"
                        >
                            Source Code
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <path
                                    d="M8 16 16 8M9 8h7v7"
                                    stroke="currentColor"
                                    stroke-width="1.6"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                        </a>
                        <span v-else class="link-action is-disabled" aria-disabled="true">
                            Source Code
                        </span>
                    </div>
                </div>
            </aside>
        </div>

        <Transition name="sheet">
            <div v-if="showDetail" class="detail-overlay" @click.self="closeDetail">
                <div
                    ref="sheetRef"
                    class="detail-sheet"
                    role="dialog"
                    aria-modal="true"
                    :aria-labelledby="'detail-title-' + selectedIndex"
                    tabindex="-1"
                >
                    <div class="detail-bar">
                        <h2 :id="'detail-title-' + selectedIndex" class="detail-title">
                            {{ active.title }}
                        </h2>
                        <button
                            class="detail-close"
                            type="button"
                            aria-label="Close project detail"
                            @click="closeDetail"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <path
                                    d="M6 6l12 12M18 6 6 18"
                                    stroke="currentColor"
                                    stroke-width="1.6"
                                    stroke-linecap="round"
                                />
                            </svg>
                        </button>
                    </div>

                    <div class="detail-scroll">
                        <figure class="detail-hero">
                            <img
                                :src="getImage(active.img)"
                                :alt="'Screenshot of ' + active.title"
                                decoding="async"
                            />
                        </figure>

                        <div class="detail-body">
                            <p class="detail-desc">{{ active.detailDescription }}</p>

                            <div class="detail-meta">
                                <div class="meta-item">
                                    Timeline
                                    <b>{{ active.timeline }}</b>
                                </div>
                                <div class="meta-item">
                                    Design
                                    <b>{{ active.design }}</b>
                                </div>
                                <div class="meta-item">
                                    Stack
                                    <b>{{ active.technologies.join(' · ') }}</b>
                                </div>
                            </div>

                            <div class="detail-actions">
                                <a
                                    v-if="active.link"
                                    class="btn is-filled"
                                    :href="active.link"
                                    target="_blank"
                                    rel="noopener"
                                >
                                    Visit
                                </a>
                                <span v-else class="btn is-filled is-disabled" aria-disabled="true">
                                    Visit
                                </span>
                                <a
                                    v-if="active.source"
                                    class="link-action"
                                    :href="active.source"
                                    target="_blank"
                                    rel="noopener"
                                >
                                    Source Code
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                        <path
                                            d="M8 16 16 8M9 8h7v7"
                                            stroke="currentColor"
                                            stroke-width="1.6"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>
                                </a>
                                <span v-else class="link-action is-disabled" aria-disabled="true">
                                    Source Code
                                </span>
                            </div>

                            <section class="detail-section">
                                <h3 class="section-title">Tech Stack</h3>
                                <div class="tech-stack">
                                    <span
                                        v-for="tech in active.technologies"
                                        :key="tech"
                                        class="tech-badge"
                                    >
                                        {{ tech }}
                                    </span>
                                </div>
                            </section>

                            <section class="detail-section">
                                <h3 class="section-title">Fitur Utama</h3>
                                <ul class="feature-list">
                                    <li v-for="(feature, i) in active.features" :key="i">
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                                            <path
                                                d="M1 6h9M7 3l3 3-3 3"
                                                stroke="currentColor"
                                                stroke-width="1.2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                        </svg>
                                        <span>{{ feature }}</span>
                                    </li>
                                </ul>
                            </section>

                            <section class="detail-section">
                                <h3 class="section-title">Alur Pengerjaan</h3>
                                <div class="workflow-steps">
                                    <div
                                        v-for="(step, i) in active.workflow"
                                        :key="i"
                                        class="workflow-step"
                                    >
                                        <div class="step-marker">
                                            <span class="step-number">{{ pad(i + 1) }}</span>
                                            <span
                                                v-if="i < active.workflow.length - 1"
                                                class="step-line"
                                            ></span>
                                        </div>
                                        <p class="step-content">{{ step }}</p>
                                    </div>
                                </div>
                            </section>
                        </div>

                        <div class="detail-foot">
                            <button class="pager" type="button" @click="stepProject(-1)">
                                <span class="pager-label">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                        <path
                                            d="M20 12H5M11 6l-6 6 6 6"
                                            stroke="currentColor"
                                            stroke-width="1.6"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>
                                    Previous project
                                </span>
                                <span class="pager-title">{{ neighbour(-1).title }}</span>
                            </button>

                            <button class="pager next" type="button" @click="stepProject(1)">
                                <span class="pager-label">
                                    Next project
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                        <path
                                            d="M4 12h15M13 6l6 6-6 6"
                                            stroke="currentColor"
                                            stroke-width="1.6"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>
                                </span>
                                <span class="pager-title">{{ neighbour(1).title }}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onDeactivated, onMounted, ref } from 'vue'
import lapanganFutsal from '../assets/lapangan-futsal.jpg'
import fakertype from '../assets/fakertype.png'
import sman1 from '../assets/sman1_new.png'
import sibarakat from '../assets/sibarakat.png'
import arekLungga from '../assets/arek_lungga.png'

interface Project {
    title: string
    description: string
    detailDescription: string
    source: string
    link: string
    img: string
    codeTools: string[]
    design: string
    features: string[]
    timeline: string
    workflow: string[]
    technologies: string[]
}

const imageMap: Record<string, string> = {
    'lapangan-futsal.jpg': lapanganFutsal,
    'fakertype.png': fakertype,
    'sman1_new.png': sman1,
    'sibarakat.png': sibarakat,
    'arek_lungga.png': arekLungga,
}

function getImage(name: string): string {
    return imageMap[name] || ''
}

function pad(value: number): string {
    return String(value).padStart(2, '0')
}

function yearOf(timeline: string): string {
    const match = timeline.match(/\d{4}/)
    return match ? match[0] : ''
}

const projects: Project[] = [
    {
        title: 'Web Sewa lapangan Futsal',
        description:
            'The Futsal Field Rental Website is a digital platform designed to make it easier for users to order futsal fields online. Through this website, users can see schedule availability, choose playing hours, and make reservations without having to come directly to the location.',
        detailDescription:
            'Web Sewa Lapangan Futsal adalah platform digital yang dikembangkan untuk memudahkan pengguna dalam melakukan pemesanan lapangan futsal secara online. Sistem ini dilengkapi dengan fitur jadwal real-time yang menampilkan ketersediaan lapangan, sehingga pengguna dapat melihat langsung slot waktu yang kosong tanpa harus menghubungi pengelola. Proses pemesanan dimulai dari pemilihan lapangan, pemilihan tanggal dan jam, hingga konfirmasi booking yang otomatis terkirim. Dari sisi admin, tersedia panel manajemen untuk mengelola jadwal, memverifikasi pemesanan, dan mengatur data lapangan serta harga. Website ini dibangun dengan arsitektur sederhana menggunakan PHP Native dan MySQL, dengan tampilan responsif yang dioptimasi untuk berbagai perangkat. Sistem autentikasi membedakan akses antara pengguna biasa dan admin, sehingga keamanan data terjaga.',
        source: 'https://github.com/fakerteamxyz/Sewa-Lapangan-Futsal/',
        link: 'https://github.com/fakerteamxyz/Sewa-Lapangan-Futsal/',
        img: 'lapangan-futsal.jpg',
        codeTools: ['PHP Native'],
        design: 'Design by Me with Figma',
        features: [
            'Jadwal booking online real-time',
            'Pemilihan lapangan & jam sewa',
            'Informasi harga & fasilitas lengkap',
            'Manajemen admin untuk kelola booking',
            'Konfirmasi pemesanan otomatis',
            'Riwayat pemesanan pengguna',
        ],
        timeline: '3 Minggu (Juni 2024)',
        workflow: [
            'Analisis kebutuhan & riset sistem booking',
            'Perancangan database & arsitektur sistem',
            'Pembuatan sistem autentikasi pengguna',
            'Pengembangan modul booking & jadwal',
            'Pembuatan admin panel manajemen',
            'Pengujian sistem & bug fixing',
            'Deployment & maintenance',
        ],
        technologies: ['PHP Native', 'MySQL', 'Bootstrap', 'JavaScript', 'HTML5', 'CSS3'],
    },
    {
        title: 'FakerType',
        description:
            'Fakertype is an automatic writing website specifically designed to help those of you who are lazy about writing manually on paper. With a simple and easy-to-use display, Fakertype allows users to type directly digitally and print the results, without having to get tired of handwriting.',
        detailDescription:
            'FakerType adalah website auto-typing yang dirancang khusus untuk membantu pengguna yang malas menulis manual di kertas. Dengan antarmuka yang simpel dan mudah digunakan, FakerType memungkinkan pengguna mengetik langsung secara digital dan mencetak hasilnya tanpa perlu repot menulis tangan. Konsepnya sangat sederhana: pengguna cukup membuka website, mulai mengetik, dan hasil tulisan bisa langsung dicetak dalam format yang rapi. Tidak perlu registrasi atau login — cukup buka dan gunakan. Website ini sangat cocok untuk situasi darurat ketika pengguna membutuhkan dokumen cetak cepat tetapi tidak memiliki akses ke Microsoft Word atau Google Docs. FakerType dibangun dengan fokus pada kecepatan loading, kemudahan penggunaan, dan fungsionalitas print yang reliable.',
        source: 'https://github.com/fakerteamxyz/Fakertype',
        link: 'https://fakertype.vercel.app/',
        img: 'fakertype.png',
        codeTools: ['JavaScript', 'Bootstrap'],
        design: 'Design by Me',
        features: [
            'Auto-typing digital instan',
            'Print langsung dari browser',
            'Antarmuka simpel & mudah digunakan',
            'Tanpa perlu registrasi atau login',
            'Responsive di semua perangkat',
        ],
        timeline: '1 Minggu (Maret 2024)',
        workflow: [
            'Riset kebutuhan & preferensi user',
            'Perancangan UI/UX sederhana & intuitif',
            'Development engine auto-typing',
            'Integrasi fungsi print',
            'Pengembangan responsive layout',
            'Testing & deployment ke Vercel',
        ],
        technologies: ['JavaScript', 'Bootstrap', 'HTML5', 'CSS3'],
    },
    {
        title: 'Sistem Informasi SMAN 1 Lareh Sago Halaban',
        description:
            'School Information System to support transparency, ease of data access, and the best service for students, teachers, and the community.',
        detailDescription:
            'Sistem Informasi SMAN 1 Lareh Sago Halaban adalah platform digital komprehensif yang dibangun untuk mendukung transparansi, kemudahan akses data, dan pelayanan terbaik bagi siswa, guru, dan masyarakat. Sistem ini mencakup berbagai modul utama: profil sekolah lengkap dengan visi-misi dan struktur organisasi, informasi akademik dan kurikulum, pengumuman dan berita sekolah terkini, serta galeri kegiatan. Dari sisi pengelola, terdapat Content Management System (CMS) yang memudahkan admin sekolah dalam memperbarui konten website secara mandiri tanpa perlu keahlian teknis. Website ini menggunakan Laravel 10 sebagai framework utama dengan arsitektur MVC yang terstruktur, sehingga memudahkan pengembangan fitur baru di masa mendatang. Proses pengembangan melibatkan koordinasi langsung dengan pihak sekolah untuk memastikan kebutuhan terpenuhi, termasuk sesi User Acceptance Testing (UAT) sebelum deployment.',
        source: '',
        link: 'https://sman1larehsagohalaban.sch.id/',
        img: 'sman1_new.png',
        codeTools: ['Laravel 10'],
        design: 'Design by Me',
        features: [
            'Manajemen data siswa & guru',
            'Informasi akademik & kurikulum',
            'Pengumuman & berita sekolah',
            'Galeri kegiatan sekolah',
            'Profil sekolah & kontak',
            'Halaman publik & admin panel CMS',
        ],
        timeline: '2 Bulan (Januari - Februari 2024)',
        workflow: [
            'Analisis kebutuhan sekolah & wawancara stakeholder',
            'Perancangan database & arsitektur sistem',
            'Pengembangan modul admin & CMS',
            'Pengembangan halaman publik',
            'Integrasi fitur & konten',
            'User Acceptance Testing dengan pihak sekolah',
            'Deployment & pelatihan admin sekolah',
        ],
        technologies: ['Laravel 10', 'MySQL', 'Bootstrap', 'JavaScript', 'HTML5', 'CSS3'],
    },
    {
        title: 'Web UPTD DINAS BPSBTPH SUMATERA BARAT',
        description: 'Sistem Informasi UPTD DINAS BPSBTPH SUMATERA BARAT.',
        detailDescription:
            'Web UPTD DINAS BPSBTPH Sumatera Barat adalah sistem informasi instansi pemerintah yang dibangun untuk menyediakan informasi lengkap mengenai profil instansi, layanan publik, berita dan artikel terkini, serta galeri dokumentasi. Website ini berfungsi sebagai portal informasi utama bagi masyarakat yang ingin mengetahui layanan-layanan yang disediakan oleh UPTD DINAS BPSBTPH. Dilengkapi dengan CMS (Content Management System) yang memudahkan admin instansi dalam mengelola dan memperbarui konten secara mandiri. Tampilan website dirancang profesional dan informatif sesuai dengan standar website pemerintah, dengan navigasi yang jelas dan struktur informasi yang terorganisir dengan baik. Setiap halaman dioptimasi untuk kecepatan akses dan kemudahan pengguna dalam menemukan informasi yang dibutuhkan.',
        source: '',
        link: 'https://sibarakat.aksipangkat.com/',
        img: 'sibarakat.png',
        codeTools: ['Web Technologies'],
        design: 'Design by Me',
        features: [
            'Profil instansi & visi-misi',
            'Informasi layanan publik',
            'Berita & artikel terkini',
            'Galeri foto dokumentasi',
            'Kontak & lokasi instansi',
            'CMS untuk kelola konten mandiri',
        ],
        timeline: '1 Bulan (Maret 2024)',
        workflow: [
            'Analisis kebutuhan instansi pemerintah',
            'Design UI profesional & informatif',
            'Development sistem CMS',
            'Integrasi konten & data instansi',
            'Testing & revisi sesuai masukan',
            'Deployment & go-live',
        ],
        technologies: ['PHP', 'MySQL', 'Bootstrap', 'JavaScript', 'HTML5', 'CSS3'],
    },
    {
        title: 'Arek Lungga',
        description: 'Website event seni Arek Lungga.',
        detailDescription:
            'Arek Lungga adalah website event seni yang dibangun untuk mempromosikan dan menginformasikan berbagai kegiatan seni kepada publik. Website ini menampilkan informasi lengkap mengenai jadwal acara, jenis pertunjukan seni, lineup pengisi acara, dan galeri dokumentasi dari setiap event yang telah berlangsung. Tampilan website dirancang modern, artistik, dan engaging untuk mencerminkan semangat seni dan kreativitas. Pengunjung dapat melihat jadwal acara mendatang, menelusuri galeri foto dan video dari pertunjukan sebelumnya, serta mendapatkan informasi tiket dan lokasi acara.',
        source: '',
        link: 'https://areklungga.monoframe.id/',
        img: 'arek_lungga.png',
        codeTools: ['Web Technologies'],
        design: 'Design by Me',
        features: [
            'Informasi jadwal & lineup acara',
            'Galeri foto & video dokumentasi',
            'Profil event & jenis pertunjukan',
            'Informasi tiket & lokasi',
            'Kontak & media sosial',
        ],
        timeline: '2 Minggu (April 2024)',
        workflow: [
            'Konsep & perancangan tampilan artistik',
            'Development halaman utama & jadwal event',
            'Integrasi galeri foto & video',
            'Testing & optimasi performa',
            'Deployment & publikasi',
        ],
        technologies: ['Bootstrap', 'JavaScript', 'CSS3', 'HTML5'],
    },
]

const compactQuery = '(max-width: 1023px)'
const isCompact = ref(window.matchMedia(compactQuery).matches)

const activeIndex = ref(0)
const selectedIndex = ref(0)
const showDetail = ref(false)

const active = computed(() => projects[selectedIndex.value])
const preview = computed(() => projects[activeIndex.value])

function neighbour(offset: number): Project {
    return projects[(selectedIndex.value + offset + projects.length) % projects.length]
}

const sheetRef = ref<HTMLElement | null>(null)
let lastFocused: HTMLElement | null = null
let mediaQuery: MediaQueryList | null = null

function onMediaChange(event: MediaQueryListEvent) {
    isCompact.value = event.matches
}

function lockScroll() {
    const gap = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    if (gap > 0) document.body.style.paddingRight = `${gap}px`
}

function unlockScroll() {
    document.body.style.overflow = ''
    document.body.style.paddingRight = ''
}

async function openDetail(index: number) {
    selectedIndex.value = index
    activeIndex.value = index
    lastFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null
    showDetail.value = true
    lockScroll()
    await nextTick()
    sheetRef.value?.focus()
}

async function closeDetail() {
    if (!showDetail.value) return
    showDetail.value = false
    unlockScroll()
    await nextTick()
    lastFocused?.focus()
    lastFocused = null
}

async function stepProject(offset: number) {
    selectedIndex.value = (selectedIndex.value + offset + projects.length) % projects.length
    activeIndex.value = selectedIndex.value
    await nextTick()
    const scroller = sheetRef.value?.querySelector<HTMLElement>('.detail-scroll')
    if (scroller) scroller.scrollTop = 0
}

function focusables(): HTMLElement[] {
    if (!sheetRef.value) return []
    return Array.from(
        sheetRef.value.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
    ).filter((element) => element.offsetParent !== null || element === document.activeElement)
}

function onKeydown(event: KeyboardEvent) {
    if (!showDetail.value) return

    if (event.key === 'Escape') {
        event.preventDefault()
        closeDetail()
        return
    }

    if (event.key !== 'Tab') return

    const list = focusables()
    if (!list.length) return

    const first = list[0]
    const last = list[list.length - 1]
    const current = document.activeElement as HTMLElement | null

    if (event.shiftKey && (current === first || current === sheetRef.value)) {
        event.preventDefault()
        last.focus()
    } else if (!event.shiftKey && current === last) {
        event.preventDefault()
        first.focus()
    }
}

onMounted(() => {
    mediaQuery = window.matchMedia(compactQuery)
    mediaQuery.addEventListener('change', onMediaChange)
    window.addEventListener('keydown', onKeydown)
})

onDeactivated(() => {
    if (showDetail.value) closeDetail()
})

onBeforeUnmount(() => {
    mediaQuery?.removeEventListener('change', onMediaChange)
    window.removeEventListener('keydown', onKeydown)
    unlockScroll()
})
</script>

<style scoped src="../styles/work.css"></style>
