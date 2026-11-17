<template>
    <div class="home view-page">
        <div class="home container">
            <img class="logo-outline" src="../assets/logo-outline-white.svg" alt="" aria-hidden="true" />
            <div>
                <div class="text">
                    <div class="title">
                        <h1 class="hero-title" aria-label="Hi, I'm Fakhri Aditia Rahman, Fullstack Developer.">
                            <span class="hero-line" aria-hidden="true">
                                <span class="hov">H</span>
                                <span class="hov">i</span>
                                <span class="hov">,</span>
                            </span>
                            <span class="hero-line" aria-hidden="true">
                                <span class="hov">I</span>
                                <span class="hov">'</span>
                                <span class="hov">m</span>
                                <span class="space"></span>
                                <span class="hov">F</span>
                                <span class="hov">a</span>
                                <span class="hov">k</span>
                                <span class="hov">h</span>
                                <span class="hov">r</span>
                                <span class="hov">i</span>
                                <span class="space"></span>
                                <span class="hov">A</span>
                                <span class="hov">d</span>
                                <span class="hov">i</span>
                                <span class="hov">t</span>
                                <span class="hov">i</span>
                                <span class="hov">a</span>
                                <span class="space"></span>
                                <span class="hov">R</span>
                                <span class="hov">a</span>
                                <span class="hov">h</span>
                                <span class="hov">m</span>
                                <span class="hov">a</span>
                                <span class="hov">n</span>
                                <span class="hov">,</span>
                            </span>
                            <span class="hero-line bottom-text" aria-hidden="true">
                                <span class="hov">F</span>
                                <span class="hov">u</span>
                                <span class="hov">l</span>
                                <span class="hov">l</span>
                                <span class="hov">s</span>
                                <span class="hov">t</span>
                                <span class="hov">a</span>
                                <span class="hov">c</span>
                                <span class="hov">k</span>
                                <span class="space"></span>
                                <span class="hov">D</span>
                                <span class="hov">e</span>
                                <span class="hov">v</span>
                                <span class="hov">e</span>
                                <span class="hov">l</span>
                                <span class="hov">o</span>

                                <span class="eye">
                                    <span class="pupil">
                                        <span class="light"></span>
                                    </span>
                                </span>
                                <span class="hov">p</span>
                                <span class="hov">e</span>
                                <span class="hov">r</span>
                                <span class="hov">.</span>
                            </span>
                        </h1>
                        <div class="desc">
                            <p>Mobile &amp; Web Specialist</p>
                        </div>
                    </div>
                </div>
                <div @click="menuBackgroundAnim(1)" class="btn">
                    <router-link to="/about">
                        about me
                    </router-link>
                </div>
            </div>
            <div class="logo-con">
                <img src="../assets/logo.svg" alt="" aria-hidden="true" />
            </div>
        </div>
        <About class="about" embedded />
        <Portfolio class="portfolio" />
        <Contact class="contact section" embedded />
        <div style="height : 3rem"></div>
    </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import { useTransition } from '../composables/useTransition'
import Portfolio from '../components/portfolio.vue'
import About from './about.vue'
import Contact from './contact.vue'

const { menuBackgroundAnim } = useTransition()
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

function onMouseMove(event: MouseEvent) {
    const x = (event.clientX * 100) / window.innerWidth + '%'
    const y = (event.clientY * 100) / window.innerHeight + '%'
    document.querySelectorAll<HTMLElement>('.pupil').forEach((eye) => {
        eye.style.left = x
        eye.style.top = y
        eye.style.transform = 'translate(-' + x + ', -' + y + ')'
    })
}

onMounted(() => {
    if (!reduceMotion.matches) document.addEventListener('mousemove', onMouseMove)
})

onBeforeUnmount(() => {
    document.removeEventListener('mousemove', onMouseMove)
})
</script>

<style scoped src="../styles/home.css"></style>
