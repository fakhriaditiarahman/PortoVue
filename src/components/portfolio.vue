<template>
    <section class="portfolio section">
        <header class="portfolio-head">
            <div class="text">
                <h2 class="title" aria-label="My portfolio">
                    <span class="outline-text" aria-hidden="true">Portfolio</span>
                    <span class="letters" aria-hidden="true">
                        <span class="hov">M</span>
                        <span class="hov">y</span>
                        <span class="space"></span>
                        <span class="hov">p</span>
                        <span class="hov">o</span>
                        <span class="hov">r</span>
                        <span class="hov">t</span>
                        <span class="hov">f</span>
                        <span class="hov">o</span>
                        <span class="hov">l</span>
                        <span class="hov">i</span>
                        <span class="hov">o</span>
                    </span>
                </h2>
                <p class="desc">
                    A small gallery of my recent projects — {{ projects.length }} builds in total.
                </p>
            </div>
            <div @click="menuBackgroundAnim(1)" ref="btn" class="btn">
                <router-link to="/work">
                    See more!
                </router-link>
            </div>
        </header>

        <div class="gallery">
            <a
                v-for="project in featuredProjects"
                :key="project.slug"
                class="gallery-card"
                :class="project.imgClass"
                :href="project.link || project.source"
                target="_blank"
                rel="noopener"
                :aria-label="`Open the ${project.title} project in a new tab`"
            >
                <img
                    :src="imgSrc(project, 640)"
                    :srcset="imgSrcSet(project)"
                    sizes="(max-width: 600px) 100vw, (max-width: 1023px) 50vw, 25vw"
                    :alt="`Screenshot of the ${project.title} project`"
                    :style="project.imgPosition ? { objectPosition: project.imgPosition } : undefined"
                    width="640"
                    height="400"
                    loading="lazy"
                    decoding="async"
                />
                <span class="gallery-caption">
                    <span class="gallery-name">{{ project.title }}</span>
                    <svg
                        class="gallery-arrow"
                        width="14"
                        height="14"
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
                </span>
            </a>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAppStore } from '../stores/app'
import { useTransition } from '../composables/useTransition'
import { featuredProjects, imgSrc, imgSrcSet, projects } from '../data/projects'

const store = useAppStore()
const { menuBackgroundAnim } = useTransition()

const btn = ref<HTMLElement | null>(null)

onMounted(() => {
    if (btn.value) store.hover.push(btn.value)
})
</script>

<style scoped src="../styles/portfolio.css"></style>
