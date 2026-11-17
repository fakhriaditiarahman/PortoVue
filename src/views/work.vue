<template>
    <div class="work-page view-page">
        <header class="work-head">
            <h1 class="title" aria-label="My projects">
                <span class="outline-text" aria-hidden="true">Projects</span>
                <span class="letters" aria-hidden="true">
                    <span class="hov">M</span>
                    <span class="hov">y</span>
                    <span class="space"></span>
                    <span class="hov">p</span>
                    <span class="hov">r</span>
                    <span class="hov">o</span>
                    <span class="hov">j</span>
                    <span class="hov">e</span>
                    <span class="hov">c</span>
                    <span class="hov">t</span>
                    <span class="hov">s</span>
                </span>
            </h1>
            <p class="work-intro">
                {{ projects.length }} builds, from school portals to business platforms. Open one
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
                                        :src="imgSrc(project, 640)"
                                        :srcset="imgSrcSet(project)"
                                        sizes="(max-width: 1023px) 90vw, 40vw"
                                        :alt="'Screenshot of ' + project.title"
                                        :style="project.imgPosition ? { objectPosition: project.imgPosition } : undefined"
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
                        :src="imgSrc(project)"
                        :srcset="imgSrcSet(project)"
                        sizes="45vw"
                        :class="{ 'is-active': index === activeIndex }"
                        :style="project.imgPosition ? { objectPosition: project.imgPosition } : undefined"
                        :fetchpriority="index === activeIndex ? 'high' : undefined"
                        alt=""
                        :loading="index === activeIndex ? 'eager' : 'lazy'"
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
                                :src="imgSrc(active)"
                                :srcset="imgSrcSet(active)"
                                sizes="(max-width: 1023px) 100vw, 900px"
                                :alt="'Screenshot of ' + active.title"
                                :style="active.imgPosition ? { objectPosition: active.imgPosition } : undefined"
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
import { imgSrc, imgSrcSet, pad, projects, yearOf, type Project } from '../data/projects'

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
