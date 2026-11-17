import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/about.vue'
import Contact from '../views/contact.vue'

const routes = [
  {
    path: '/',
    name: 'Home Page',
    component: Home,
    meta: {
      title: 'Fakhri Aditia Rahman - Mobile & Web Full Stack Developer',
      description:
        'Portfolio Fakhri Aditia Rahman - Mobile & Web Full Stack Developer. Spesialisasi di Vue.js, Laravel, Flutter, dan React Native. Lihat proyek dan skill saya.'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {
      title: 'About - Fakhri Aditia Rahman',
      description:
        'Tentang Fakhri Aditia Rahman, full stack developer yang fokus pada pengembangan aplikasi mobile dan web.'
    }
  },
  {
    path: '/skills',
    name: 'Skills',
    component: () => import('../views/skills.vue'),
    meta: {
      title: 'Skills - Fakhri Aditia Rahman',
      description:
        'Keahlian Fakhri Aditia Rahman: Vue.js, React, JavaScript, Node.js, Express, Laravel, Flutter, dan React Native.'
    }
  },
  {
    path: '/contact',
    name: 'Contact Page',
    component: Contact,
    meta: {
      title: 'Contact - Fakhri Aditia Rahman',
      description:
        'Hubungi Fakhri Aditia Rahman untuk kolaborasi proyek pengembangan web dan aplikasi mobile.'
    }
  },
  {
    path: '/work',
    name: 'My Work Page',
    component: () => import('../views/work.vue'),
    meta: {
      title: 'Projects - Fakhri Aditia Rahman',
      description:
        'Kumpulan proyek yang dikerjakan Fakhri Aditia Rahman: platform bisnis, website sekolah, landing page, dan aplikasi web modern.'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('../views/NotFound.vue'),
    meta: {
      title: 'Page Not Found - Fakhri Aditia Rahman',
      description: 'Halaman yang Anda cari tidak ditemukan.',
      noindex: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => {
    return new Promise((resolve) => resolve({ top: 0 }))
  }
})

export default router
