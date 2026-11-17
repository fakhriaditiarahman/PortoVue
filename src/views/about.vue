<template>
  <div class="about view-page">
    <div class="container">
      <div class="text">
        <component :is="headingTag" class="title" aria-label="About">
          <span class="letters" aria-hidden="true">
            <span class="hov">A</span>
            <span class="hov">b</span>
            <span class="hov">o</span>
            <span class="hov">u</span>
            <span class="hov">t</span>
          </span>
        </component>
        <p class="desc">
          Hi, My name is Fakhri Aditia Rahman, and I'm a full stack developer
          focused on mobile and web, with expertise creating engaging and
          straightforward user experiences. I'm enthusiastic about building
          seamless experiences that assist people in achieving their objectives.
          <br /><br />
          As an Informatics Engineering student, I'm constantly learning and improving
          my abilities. I've worked on projects ranging from small websites to
          large-scale web applications, and I'm committed to providing
          high-quality work that fulfills both the demands of the user and the
          specifications of the project.
          <br /><br />
          Please get in touch if you're seeking a full stack developer for mobile
          and web that is passionate about designing engaging and intuitive user
          interfaces backed by solid APIs and databases, or if you have an
          intriguing project you'd like to explore. I'm thrilled to collaborate
          with you and help you realize your vision.
        </p>
      </div>
      <div class="tagcloud"></div>
    </div>
    <div class="github-stats section" style="margin-top: 5rem; width: 100%; display: flex; flex-direction: column; align-items: center;">
      <div style="text-align: center; color: var(--second-color); font-family: 'Poppins', sans-serif; letter-spacing: 1px;">
        <h2 class="title" style="margin-bottom: 2rem; position: relative; font-size: var(--font-title-section);" aria-label="GitHub Stats">
          <span class="outline-text" style="width: 100%; position: absolute; overflow: visible; opacity: 0.1; left: 50%; transform: translateX(-50%); top: -50px; font-size: 8rem; z-index: -1; text-align: center;" aria-hidden="true">Stats</span>
          <span class="letters" aria-hidden="true">
            <span class="hov">G</span>
            <span class="hov">i</span>
            <span class="hov">t</span>
            <span class="hov">H</span>
            <span class="hov">u</span>
            <span class="hov">b</span>
            <span class="space" style="padding: 6px;"></span>
            <span class="hov">S</span>
            <span class="hov">t</span>
            <span class="hov">a</span>
            <span class="hov">t</span>
            <span class="hov">s</span>
          </span>
        </h2>
      </div>
      <div class="stats-images" style="display: flex; flex-direction: column; align-items: center; gap: 20px; width: 100%;">
        <img
          src="https://streak-stats.demolab.com?user=fakhriaditiarahman&theme=tokyonight&hide_border=true"
          alt="GitHub streak stats for Fakhri Aditia Rahman"
          width="495"
          height="195"
          style="max-width: 100%; height: auto;"
          loading="lazy"
          decoding="async"
        >
        <img
          src="https://raw.githubusercontent.com/fakhriaditiarahman/PortoVue/profilescape-output/3d-dark.svg"
          alt="Profilescape 3D contribution landscape — Fakhri Aditia Rahman"
          width="1200"
          height="480"
          style="max-width: 100%; height: auto;"
          loading="lazy"
          decoding="async"
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import TagCloud from 'TagCloud'

const props = defineProps<{ embedded?: boolean }>()
const headingTag = computed(() => (props.embedded ? 'h2' : 'h1'))

onMounted(() => {
    const SCREEN_WIDTH = window.innerWidth
    const container = '.tagcloud'
    let radius = 250
    if (SCREEN_WIDTH > 1024) {
      radius = 250
    } else if (SCREEN_WIDTH > 800) {
      radius = 170
    } else if (SCREEN_WIDTH > 500) {
      radius = 130
    }
    const texts = [
      'VueJs',
      'HTML',
      'JavaScript',
      'CSS3',
      'ReactJs',
      'SCSS',
      'Figma',
      'GIT',
      'WEB',
      'NodeJs',
      'NoSQL',
      'SQL',
      'Java',
      'ExpressJs',
      'TailwindCSS',
      'Bootstrap',
      'JQuery',
      'Typescript',
    ]
    const options = {
      radius: radius,
    }

    TagCloud(container, texts, options)
})
</script>

<style scoped src="../styles/about.css"></style>
