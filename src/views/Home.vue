<template>
    <div class="home view-page">
        <div class="home container">
            <img class="logo-outline" src="../assets/logo-outline-white.svg" alt="" />
            <div>
                <div class="text">
                    <div class="title">
                        <h1>
                            <span class="hov">H</span>
                            <span class="hov">i</span>
                            <span class="hov">,</span>
                        </h1>
                        <h1>
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
                        </h1>

                        <h1 class="bottom-text">
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

                            <div class="eye">
                                <div class="pupil">
                                    <div class="light"></div>
                                </div>
                            </div>
                            <span class="hov">p</span>
                            <span class="hov">e</span>
                            <span class="hov">r</span>
                            <span class="hov">.</span>
                        </h1>
                        <div class="desc">
                            <p>Mobile &amp; Web Specialist</p>
                        </div>
                    </div>
                </div>
                <div @click="menuBackgroundAnim(1)" ref="btn" class="btn">
                    <router-link to="/about">
                        about me
                    </router-link>
                </div>
            </div>
            <div class="logo-con">
                <img src="../assets/logo.svg" alt="" />
            </div>
        </div>
        <About class="about" />
        <Portfolio class="portfolio" />
        <Contact class="contact section" />
        <div style="height : 3rem"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAppStore } from '../stores/app'
import { useTransition } from '../composables/useTransition'
import Portfolio from '../components/portfolio.vue'
import About from './about.vue'
import Contact from './contact.vue'

const store = useAppStore()
const { menuBackgroundAnim } = useTransition()

const btn = ref<HTMLElement | null>(null)
const isBoxSupport = ref(true)

onMounted(() => {
    if (btn.value) {
        store.hover.push(btn.value)
    }

    if (window.getComputedStyle(document.body).transformBox !== undefined) {
        isBoxSupport.value = true
    } else {
        isBoxSupport.value = false
    }

    const eyes = document.querySelectorAll('.pupil')
    document.onmousemove = function(event: MouseEvent) {
        const x = (event.clientX * 100) / window.innerWidth + '%'
        const y = (event.clientY * 100) / window.innerHeight + '%'
        eyes.forEach((eye) => {
            (eye as HTMLElement).style.left = x
            ;(eye as HTMLElement).style.top = y
            ;(eye as HTMLElement).style.transform = 'translate(-' + x + ', -' + y + ')'
        })
    }
})
</script>

<style scoped src="../styles/home.css"></style>
