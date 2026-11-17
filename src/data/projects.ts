// Single source of truth for project data.
// Covers live at /img/<slug-base>-640.webp and -1280.webp.

export interface Project {
    slug: string
    title: string
    description: string
    detailDescription: string
    source: string
    link: string
    img: string
    imgClass?: string
    featured?: boolean
    imgPosition?: string
    codeTools: string[]
    design: string
    features: string[]
    timeline: string
    workflow: string[]
    technologies: string[]
}

export const projects: Project[] = [
    {
        title: 'Web Sewa lapangan Futsal',
        description:
            'The Futsal Field Rental Website is a digital platform designed to make it easier for users to order futsal fields online. Through this website, users can see schedule availability, choose playing hours, and make reservations without having to come directly to the location.',
        detailDescription:
            'Web Sewa Lapangan Futsal adalah platform digital yang dikembangkan untuk memudahkan pengguna dalam melakukan pemesanan lapangan futsal secara online. Sistem ini dilengkapi dengan fitur jadwal real-time yang menampilkan ketersediaan lapangan, sehingga pengguna dapat melihat langsung slot waktu yang kosong tanpa harus menghubungi pengelola. Proses pemesanan dimulai dari pemilihan lapangan, pemilihan tanggal dan jam, hingga konfirmasi booking yang otomatis terkirim. Dari sisi admin, tersedia panel manajemen untuk mengelola jadwal, memverifikasi pemesanan, dan mengatur data lapangan serta harga. Website ini dibangun dengan arsitektur sederhana menggunakan PHP Native dan MySQL, dengan tampilan responsif yang dioptimasi untuk berbagai perangkat. Sistem autentikasi membedakan akses antara pengguna biasa dan admin, sehingga keamanan data terjaga.',
        source: 'https://github.com/fakerteamxyz/Sewa-Lapangan-Futsal/',
        link: 'https://github.com/fakerteamxyz/Sewa-Lapangan-Futsal/',
        img: 'lapangan-futsal',
        slug: 'sewa-lapangan-futsal',
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
        timeline: '3 Minggu (Juni 2023)',
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
        img: 'fakertype',
        slug: 'fakertype',
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
        img: 'sman1',
        slug: 'sman1-lareh-sago-halaban',
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
        timeline: '2 Bulan (Januari - Februari 2025)',
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
        img: 'sibarakat',
        slug: 'uptd-bpsbtph',
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
        timeline: '1 Bulan (Maret 2026)',
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
        img: 'arek-lungga',
        slug: 'arek-lungga',
        codeTools: ['Web Technologies'],
        design: 'Design by Me',
        features: [
            'Informasi jadwal & lineup acara',
            'Galeri foto & video dokumentasi',
            'Profil event & jenis pertunjukan',
            'Informasi tiket & lokasi',
            'Kontak & media sosial',
        ],
        timeline: '2 Minggu (April 2026)',
        workflow: [
            'Konsep & perancangan tampilan artistik',
            'Development halaman utama & jadwal event',
            'Integrasi galeri foto & video',
            'Testing & optimasi performa',
            'Deployment & publikasi',
        ],
        technologies: ['Bootstrap', 'JavaScript', 'CSS3', 'HTML5'],
    },
    {
        title: 'Monobox Photobooth',
        description:
            'Monobox is a photobooth rental platform in Padang for weddings, corporate gatherings, and events. Visitors can browse products, check available packages, see the gallery, find outlet locations, and book a session online.',
        detailDescription:
            'Monobox adalah platform penyewaan photobooth di Padang yang melayani kebutuhan pernikahan, gathering kantor, dan berbagai event. Website ini menghadirkan solusi photobooth lengkap mulai dari unit siap pakai, rental photobooth, custom frame untuk brand, hingga program kemitraan dan langganan software yang terintegrasi. Pengunjung dapat menelusuri katalog produk beserta paketnya, melihat galeri hasil foto, menemukan lokasi outlet, dan melakukan booking sesi secara online tanpa harus datang ke lokasi. Dari sisi pengelola, tersedia dashboard admin untuk memantau booking, mengatur katalog dan paket, serta memperbarui konten galeri. Website dibangun menggunakan Laravel dengan Bootstrap untuk tampilan yang responsif, didukung Vite sebagai build tool, dan dilengkapi dukungan dua bahasa (Indonesia & English) agar mudah diakses berbagai kalangan.',
        source: '',
        link: 'https://monobox.monoframe.id/',
        img: 'monobox',
        slug: 'monobox-photobooth',
        featured: true,
        codeTools: ['Laravel', 'Bootstrap'],
        design: 'Design by Me',
        features: [
            'Booking sesi photobooth online',
            'Katalog produk, paket & rental',
            'Custom frame untuk kebutuhan brand',
            'Galeri hasil foto & dokumentasi',
            'Informasi lokasi & outlet Padang',
            'Program kemitraan & langganan software',
            'Dashboard admin untuk kelola booking',
            'Dukungan dua bahasa (ID & EN)',
        ],
        timeline: '2026',
        workflow: [
            'Riset kebutuhan photobooth & target pasar',
            'Perancangan UI/UX dan struktur halaman',
            'Setup project Laravel & konfigurasi Bootstrap',
            'Pengembangan modul booking & jadwal',
            'Pengembangan katalog, galeri, dan lokasi outlet',
            'Pembuatan dashboard admin',
            'Integrasi multi-bahasa, testing & deployment',
        ],
        technologies: [
            'Laravel',
            'Bootstrap',
            'Vite',
            'JavaScript',
            'MySQL',
            'HTML5',
            'CSS3',
        ],
    },
    {
        title: 'Kopi Ajoe',
        description:
            'Kopi Ajoe is a cinematic coffee landing page that tells the story of a Padang-born coffee brand through a scroll-driven cup animation, from bean selection to the last sip.',
        detailDescription:
            'Kopi Ajoe adalah landing page kopi sinematik yang mengangkat cerita brand kopi asal Padang, dari pemilihan biji hingga tegukan terakhir. Halaman dibuka dengan animasi scroll sepanjang 900vh: gambar kopi bergerak mengikuti scroll, diselingi teks bertahap seperti "Taste the Tradition" dan "Brewed for Perfection", sebelum masuk ke cerita pendiri, keunggulan produk, jangkauan kota, dan menu racikan Ajoe. Seluruh animasi dikendalikan lewat scroll sehingga pengunjung terasa diajak menonton film pendek, bukan sekadar membaca halaman. Tampilan dibangun dengan Next.js App Router dan Tailwind CSS, memakai canvas full-screen untuk animasi, mix-blend-mode, dan tipografi besar bergaya editorial untuk menghadirkan kesan premium. Situs juga dilengkapi indikator progres loading, navigasi minimalis, kartu menu interaktif, dan daftar kota dengan status "Coming Soon" sebagai penanda ekspansi brand.',
        source: '',
        link: 'https://kopiajoe.vercel.app/',
        img: 'kopiajoe',
        slug: 'kopi-ajoe',
        featured: true,
        codeTools: ['Next.js', 'Tailwind CSS'],
        design: 'Design by Me',
        features: [
            'Animasi scroll sinematik 900vh',
            'Hero canvas full-screen',
            'Progress loading "Brewing Experience"',
            'Cerita pendiri & nilai brand',
            'Kartu keunggulan produk interaktif',
            'Statistik brand & jangkauan kota',
            'Menu racikan dengan hover reveal',
            'Navigasi minimalis & responsif',
        ],
        timeline: '2 Minggu (November 2026)',
        workflow: [
            'Riset brand & referensi landing page sinematik',
            'Perancangan alur cerita berbasis scroll',
            'Penyusunan aset gambar & tipografi editorial',
            'Setup project Next.js & Tailwind CSS',
            'Pengembangan animasi canvas & scroll timeline',
            'Penyusunan section cerita, statistik, dan menu',
            'Responsive testing, optimasi performa & deployment',
        ],
        technologies: [
            'Next.js',
            'Tailwind CSS',
            'JavaScript',
            'HTML5 Canvas',
            'CSS3',
        ],
    },
    {
        title: 'Mono Creative',
        description:
            'Mono Creative is a cinematic landing page for a property marketing studio, pairing a full-bleed aerial hero with a scroll-driven story that leads into services, showreel, team, portfolio, and contact.',
        detailDescription:
            'Mono Creative adalah landing page untuk agensi creative & sales partner yang fokus melayani developer properti. Halaman dibuka dengan hero full-screen berisi footage aerial kawasan hunian dan headline besar "Every great property starts with a story", lalu cerita bergerak mengikuti scroll: pergeseran persepsi dari visual biasa menjadi visual premium, penjelasan value agensi, layanan creative production hingga brand & campaign, showreel film, profil tim, dan portfolio properti dengan filter kategori. Struktur halaman disusun sebagai narasi penjualan, bukan sekadar katalog: setiap section diarahkan untuk membangun persepsi premium dan mendorong inquiry dari developer. Situs dibangun dengan Astro sehingga mayoritas halaman tersaji sebagai HTML statis yang ringan dan cepat, didukung optimasi gambar bawaan Astro (AVIF responsif dengan lazy loading), animasi scroll berbasis Motion, serta layout CSS custom yang responsif. Bagian kontak dilengkapi form dengan validasi nama PIC, perusahaan, email, telepon, dan tipe project, ditambah akses cepat ke WhatsApp dan Instagram.',
        source: '',
        link: 'https://monocreative-pi.vercel.app/',
        img: 'mono-creative',
        slug: 'mono-creative',
        featured: true,
        imgClass: 'is-mono',
        imgPosition: '12% center',
        codeTools: ['Astro', 'Motion'],
        design: 'Design by Me',
        features: [
            'Hero sinematik full-screen aerial property',
            'Scroll storytelling & animasi reveal',
            'Penjelasan layanan creative production end-to-end',
            'Showreel film dengan player',
            'Profil tim & portfolio dengan filter kategori',
            'Alur kerja 8 tahap yang transparan',
            'Form kontak dengan validasi & akses WhatsApp',
            'Optimasi gambar AVIF & performa Astro',
        ],
        timeline: '2 Minggu (November 2026)',
        workflow: [
            'Riset brand & kompetitor industri properti',
            'Perancangan struktur halaman & copywriting',
            'Penyusunan aset visual & footage aerial',
            'Setup project Astro & design system',
            'Development section hero, services, showreel, dan portfolio',
            'Integrasi animasi scroll & form kontak',
            'Optimasi gambar, responsive testing & deployment',
        ],
        technologies: [
            'Astro',
            'JavaScript',
            'Motion',
            'HTML5',
            'CSS3',
        ],
    },
    {
        title: 'Monodev',
        description:
            'Monodev is a digital agency platform for professional websites and business apps, from company profiles and e-commerce to custom web apps, SaaS, and mobile apps — with clear pricing packages, a portfolio, testimonials, and a client portal for projects and invoices.',
        detailDescription:
            'Monodev adalah platform agency digital yang menawarkan jasa pembuatan website dan aplikasi bisnis profesional, mulai dari company profile, e-commerce, aplikasi web custom, SaaS platform, hingga aplikasi mobile. Halaman publiknya dibuka dengan hero interaktif berisi lima kategori layanan, lalu dilanjutkan paket harga dengan rincian fitur, portofolio, testimoni klien, FAQ, dan formulir kontak. Pengunjung dapat mendaftar sebagai klien dan masuk ke client dashboard untuk memantau progres proyek beserta milestone dan lampirannya, mengunduh invoice PDF, mengunggah bukti pembayaran, membuka tiket dukungan, serta melihat statistik program referral. Di baliknya tersedia admin panel lengkap untuk mengelola pengguna dan role, inquiry yang bisa dikonversi menjadi proyek, milestone, invoice, portofolio, testimoni, FAQ, tiket, paket harga, promo popup, hingga ekspor data klien. Situs mendukung dua bahasa (Indonesia & English) dan dibangun dengan Laravel, Inertia.js, React, serta Tailwind CSS sehingga navigasinya terasa seperti single-page app.',
        source: '',
        link: 'https://monodev.tech/',
        img: 'monodev',
        slug: 'monodev',
        featured: true,
        codeTools: ['Laravel', 'React'],
        design: 'Design by Me',
        features: [
            'Hero interaktif dengan 5 kategori layanan',
            'Paket harga dengan rincian fitur transparan',
            'Portofolio, testimoni klien & FAQ',
            'Registrasi & login area klien',
            'Dashboard proyek dengan milestone',
            'Invoice PDF & unggah bukti pembayaran',
            'Tiket dukungan & program referral',
            'Admin panel untuk kelola konten & proyek',
            'Dukungan dua bahasa (ID & EN)',
        ],
        timeline: '2026',
        workflow: [
            'Riset kebutuhan layanan agency & target pasar',
            'Perancangan struktur halaman publik & alur pendaftaran klien',
            'Setup project Laravel, Inertia.js, React & Tailwind CSS',
            'Pengembangan landing page, paket harga, portofolio & testimoni',
            'Pembuatan area klien: proyek, invoice, tiket & referral',
            'Pembuatan admin panel & manajemen konten',
            'Integrasi multi-bahasa, testing & deployment',
        ],
        technologies: [
            'Laravel',
            'Inertia.js',
            'React',
            'Tailwind CSS',
            'MySQL',
            'Vite',
        ],
    },
]
export const featuredProjects = projects.filter((project) => project.featured)

export function imgSrc(project: Project, width: 640 | 1280 = 1280): string {
    return `/img/${project.img}-${width}.webp`
}

export function imgSrcSet(project: Project): string {
    return `/img/${project.img}-640.webp 640w, /img/${project.img}-1280.webp 1280w`
}

export function pad(value: number): string {
    return String(value).padStart(2, '0')
}

export function yearOf(timeline: string): string {
    const match = timeline.match(/\d{4}/)
    return match ? match[0] : ''
}
