<template>
    <div id="app">
        <div class="cursor" ref="cursor" aria-hidden="true"></div>

        <a class="skip-link" href="#main-content">Skip to content</a>

        <div class="welcome" ref="welcome" aria-hidden="true">
            <h1>
                <span>H</span>
                <span>i</span>
                <span>.</span>
            </h1>
        </div>

        <main id="main-content" class="view" tabindex="-1">
            <div class="symbols" aria-hidden="true">
                <div class="top">
                    <i class="fas fa-less-than"></i>
                </div>
                <div class="bottom">
                    <i class="fas fa-slash"></i>
                    <i class="fas fa-greater-than"></i>
                </div>
            </div>
            <router-view v-slot="{ Component }">
                <transition name="fade" mode="out-in">
                    <keep-alive>
                        <component :is="Component" />
                    </keep-alive>
                </transition>
            </router-view>
        </main>
        <nav>
            <navBar />
        </nav>

        <div class="trans-back" ref="transition" aria-hidden="true">
            <img src="./assets/logo.svg" alt="Logo" />
            <p>Let me think &#129300;</p>
            <div class="loadbar">
                <div class="progress"></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from './stores/app'
import { useTransition } from './composables/useTransition'
import { usePageMeta } from './composables/usePageMeta'
import navBar from './components/nav.vue'

const route = useRoute()
const store = useAppStore()
const { menuBackgroundAnim } = useTransition()

usePageMeta()

const cursor = ref<HTMLElement | null>(null)
const welcome = ref<HTMLElement | null>(null)
const transition = ref<HTMLElement | null>(null)

onMounted(() => {
    store.backgroundTransition = transition.value

    const cursorEl = cursor.value
    if (cursorEl) {
        document.addEventListener('mousemove', (e) => {
            cursorEl.setAttribute(
                'style',
                `top : ${e.clientY}px; left : ${e.clientX}px`
            )
        })
    }

    setTimeout(() => {
        welcome.value?.classList.toggle('show')
    }, 2500)

    const pathLists = ['/', '/about', '/skills', '/work', '/contact']
    const currentPath = route.path
    const pageIndex = pathLists.indexOf(currentPath)
    menuBackgroundAnim(pageIndex)
})
</script>

<style src="./styles/app.css"></style>
