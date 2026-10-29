<template>
    <div class="skills view-page">
        <div class="text">
            <h1 class="title">
                <div class="outline-text">Skills</div>
                <span class="hov">W</span>
                <span class="hov">h</span>
                <span class="hov">a</span>

                <span class="hov">t</span>
                <span class="space"></span>
                <span class="hov">I</span>
                <span class="space"></span>
                <span class="hov">D</span>
                <span class="hov">o</span>
            </h1>

            <p>
                My main focus is full stack development for mobile and web — from
                the interface users see to the APIs and databases behind it.
            </p>

            <p>
                Build beautiful and interactive web applications with HTML, CSS,
                JavaScript, or Vue.js, and cross-platform mobile apps with Flutter
                and React Native.
            </p>

            <p>
                I also have backend experience with Node.js, Express, Laravel, and
                SQL/MongoDB.
            </p>
            <p>
                Visit my
                <a target="_blank" href="https://www.linkedin.com/in/fakhri-aditia-rahman-36b54229b/"
                    class="link linkedln">Linkedln</a>
                profile for more details or just
                <span @click="menuBackgroundAnim(4)"><router-link to="/contact" class="link contact">
                        contact me.</router-link></span>
            </p>
        </div>
        <div class="illus">
            <div class="front__end">
                <div class="react stack" @click="
                        showInfo('React.Js', 'react', 'A Javascript framework')
                    ">
                    <p>React.Js</p>

                    <span>
                        <i class="fab fa-react"></i>
                    </span>
                </div>
                <div class="vue stack" @click="showInfo('Vue.Js', 'vue', 'A Javascript framework')">
                    <p>Vue.Js</p>

                    <span>
                        <i class="fab fa-vuejs"></i>
                    </span>
                </div>
                <div class="js stack" @click="
                        showInfo(
                            'Javascript',
                            'javascript',
                            'JavaScript is the Programming Language for the Web'
                        )
                    ">
                    <p>Javascript</p>

                    <span>
                        <i class="fab fa-js-square"></i>
                    </span>
                </div>
                <div class="sass stack" @click="
                        showInfo(
                            'Sass',
                            'sass',
                            'Sass is a preprocessor scripting language that is interpreted or compiled into Cascading Style Sheets.'
                        )
                    ">
                    <p>Sass</p>

                    <span>
                        <i class="fab fa-sass"></i>
                    </span>
                </div>
                <div class="css stack" @click="
                        showInfo(
                            'CSS',
                            'css',
                            'CSS is a tool for Create beautiful, responsive layout, and implementing the design into the Web App'
                        )
                    ">
                    <p>CSS</p>

                    <span>
                        <i class="fab fa-css3-alt"></i>
                    </span>
                </div>
                <div class="html stack" @click="
                        showInfo(
                            'HTML',
                            'html',
                            'HTML is a standard for describing a structure and presentation of information in a web.'
                        )
                    ">
                    <p>HTML</p>

                    <span>
                        <i class="fab fa-html5"></i>
                    </span>
                </div>
            </div>
            <div class="back__end">
                <div class="express stack" @click="
                        showInfo(
                            'Express.Js',
                            'express',
                            'Express.Js is a framework for Node.Js, '
                        )
                    ">
                    <p>Express.Js</p>

                    <span>
                        <i class="fab fa-node-js"></i>
                    </span>
                </div>
                <div class="node stack" @click="
                        showInfo(
                            'Node Js',
                            'node',
                            'A Javascript runtime environment that executes JavaScript code outside a web browser. For example for Backend.'
                        )
                    ">
                    <p>Node.Js</p>

                    <span>
                        <i class="fab fa-node"></i>
                    </span>
                </div>
                <div class="mongo stack" @click="
                        showInfo(
                            'MongoDB',
                            'mongodb',
                            'MongoDB is a cross-platform document-oriented database program. Classified as a NoSQL database program.'
                        )
                    ">
                    <p>NoSQL</p>

                    <span>
                        <i class="fas fa-database"></i>
                    </span>
                </div>
                <div class="mongo stack" @click="
                        showInfo(
                            'MongoDB',
                            'mongodb',
                            'MongoDB is a cross-platform document-oriented database program. Classified as a NoSQL database program.'
                        )
                    ">
                    <p>SQL</p>

                    <span>
                        <i class="fas fa-database"></i>
                    </span>
                </div>
                <div class="laravel stack" @click="
                        showInfo(
                            'Laravel',
                            'laravel-svgrepo-com',
                            'Laravel is a PHP framework for building modern web applications efficiently and securely.'
                        )
                    ">
                    <p>Laravel</p>
                    <span>
                        <img src="../assets/laravel-svgrepo-com.png" alt="Laravel" style="height:24px;" />
                    </span>
                </div>
            </div>
        </div>

        <div class="skills-info" ref="skillInfo">
            <div class="card">
                <div class="logo">
                    <img :src="iconSrc" />
                </div>
                <h3>{{ title }}</h3>
                <p>{{ content }}</p>
                <div class="close" @click="closeInfo">
                    <i class="fas fa-times"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useTransition } from '../composables/useTransition'

const { menuBackgroundAnim } = useTransition()

const title = ref('')
const icon = ref('vue')
const content = ref('')
const skillInfo = ref<HTMLElement | null>(null)

import reactIcon from '../assets/react.svg'
import vueIcon from '../assets/vue.svg'
import javascriptIcon from '../assets/javascript.svg'
import sassIcon from '../assets/sass.svg'
import cssIcon from '../assets/css.svg'
import htmlIcon from '../assets/html.svg'
import expressIcon from '../assets/express.svg'
import nodeIcon from '../assets/node.svg'
import mongodbIcon from '../assets/mongodb.svg'

const iconMap: Record<string, string> = {
  react: reactIcon,
  vue: vueIcon,
  javascript: javascriptIcon,
  sass: sassIcon,
  css: cssIcon,
  html: htmlIcon,
  express: expressIcon,
  node: nodeIcon,
  mongodb: mongodbIcon,
  'laravel-svgrepo-com': ''
}

const iconSrc = computed(() => {
  return iconMap[icon.value] || ''
})

function showInfo(skillTitle: string, skillIcon: string, skillContent: string) {
    title.value = skillTitle
    icon.value = skillIcon
    content.value = skillContent
    skillInfo.value?.classList.toggle('show')
}

function closeInfo() {
    skillInfo.value?.classList.toggle('show')
}
</script>

<style scoped src="../styles/skills.css"></style>
