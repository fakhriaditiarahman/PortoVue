<template>
    <section class="portfolio section">
        <header class="portfolio-head">
            <div class="text">
                <h1 class="title" aria-label="My portfolio">
                    <span class="outline-text" aria-hidden="true">Portfolio</span>
                    <span class="hov" aria-hidden="true">M</span>
                    <span class="hov" aria-hidden="true">y</span>
                    <span class="space" aria-hidden="true"></span>
                    <span class="hov" aria-hidden="true">p</span>
                    <span class="hov" aria-hidden="true">o</span>
                    <span class="hov" aria-hidden="true">r</span>
                    <span class="hov" aria-hidden="true">t</span>
                    <span class="hov" aria-hidden="true">f</span>
                    <span class="hov" aria-hidden="true">o</span>
                    <span class="hov" aria-hidden="true">l</span>
                    <span class="hov" aria-hidden="true">i</span>
                    <span class="hov" aria-hidden="true">o</span>
                </h1>
                <p class="desc">A small gallery of my recent projects</p>
            </div>
            <div @click="menuBackgroundAnim(1)" ref="btn" class="btn">
                <router-link to="/work">
                    See more!
                </router-link>
            </div>
        </header>

        <div class="gallery">
            <a
                class="gallery-card"
                href="https://fakertype.vercel.app/"
                target="_blank"
                rel="noopener"
                aria-label="Open the Fakertype project in a new tab"
            >
                <img
                    src="../assets/fakertype.png"
                    alt="Fakertype project homepage"
                    loading="lazy"
                    decoding="async"
                />
                <span class="gallery-caption">
                    <span class="gallery-name">Fakertype</span>
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

            <a
                class="gallery-card"
                href="https://github.com/fakerteamxyz/Sewa-Lapangan-Futsal/"
                target="_blank"
                rel="noopener"
                aria-label="Open the Sewa Lapangan Futsal project in a new tab"
            >
                <img
                    src="../assets/lapangan-futsal.jpg"
                    alt="Sewa Lapangan Futsal project homepage"
                    loading="lazy"
                    decoding="async"
                />
                <span class="gallery-caption">
                    <span class="gallery-name">Sewa Lapangan Futsal</span>
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

            <a
                class="gallery-card"
                href="https://kopiajoe.vercel.app/"
                target="_blank"
                rel="noopener"
                aria-label="Open the Kopi Ajoe project in a new tab"
            >
                <img
                    src="/kopiajoe.jpeg"
                    alt="Kopi Ajoe landing page"
                    loading="lazy"
                    decoding="async"
                />
                <span class="gallery-caption">
                    <span class="gallery-name">Kopi Ajoe</span>
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

            <a
                class="gallery-card"
                href="https://monocreative-pi.vercel.app/"
                target="_blank"
                rel="noopener"
                aria-label="Open the Mono Creative project in a new tab"
            >
                <img
                    src="/monocreative.jpeg"
                    alt="Mono Creative landing page"
                    loading="lazy"
                    decoding="async"
                />
                <span class="gallery-caption">
                    <span class="gallery-name">Mono Creative</span>
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
import { useTransition } from '../composables/useTransition'

const { menuBackgroundAnim } = useTransition()
</script>

<style scoped src="../styles/portfolio.css"></style>
