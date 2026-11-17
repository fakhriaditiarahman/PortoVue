<template>
    <div class="contact view-page">
        <div class="main" ref="main">
            <div class="text">
                <div class="title">
                    <h1>
                        <div class="outline-text">Contact</div>
                        <span class="hov">C</span>
                        <span class="hov">o</span>
                        <span class="hov">n</span>
                        <span class="hov">t</span>
                        <span class="hov">a</span>
                        <span class="hov">c</span>
                        <span class="hov">t</span>
                        <span class="space"></span>
                        <span class="hov">M</span>
                        <span class="hov">e</span>
                    </h1>
                </div>
                <form @submit="send" class="form" aria-label="Contact form">
                    <input type="hidden" name="_captcha" value="false" />
                    <div class="input-wrapper">
                        <label for="name" class="sr-only">Name</label>
                        <input type="text" placeholder="Name" required v-model="name" name="name" id="name" class="input" />

                        <label for="email" class="sr-only">Email address</label>
                        <input type="email" placeholder="Email address" name="email" required v-model="email" id="email"
                            class="input" />
                    </div>
                    <label for="subject" class="sr-only">Subject</label>
                    <input type="text" placeholder="Subject" required v-model="subject" name="subject" id="subject" class="input" />
                    <label for="message" class="sr-only">Message</label>
                    <textarea id="message" cols="30" rows="10" placeholder="Your Message" name="message" required
                        v-model="message" class="textarea"></textarea>
                    <div class="buttons">
                        <div class="social">
                            <a class="email media" href="mailto:fakhriaditiarahman12@gmail.com" target="_blank" aria-label="Email me">
                                <i class="fas fa-envelope"></i>
                            </a>
                            <a class="x media" href="https://x.com/FakhriAR05" target="_blank" aria-label="Follow on X">
                                <i class="fab fa-twitter"></i>
                            </a>
                            <a class="github media" href="https://github.com/fakerteamxyz" target="_blank" aria-label="Follow on GitHub">
                                <i class="fab fa-github"></i>
                            </a>
                            <a class="Linkedln media" href="https://www.linkedin.com/in/fakhri-aditia-rahman-36b54229b/"
                                target="_blank" aria-label="Connect on LinkedIn">
                                <i class="fab fa-linkedin"></i>
                            </a>
                        </div>
                        <div class="action-btn">
                            <a class="btn" href="https://drive.google.com/uc?export=download&id=1W6uTeokts_PyimR1rSqe9ChwSpEJiqm5" target="_blank">
                                Download CV
                            </a>
                            <button type="submit" class="btn">
                                Send Message!
                            </button>
                        </div>
                    </div>
                </form>
            </div>

        </div>

        <div class="loader " v-if="isShowingStatus">
            <div class="lds-ring" v-if="isLoading"></div>
            <div v-else class="message-status">
                <b>{{ sendMessageStatus }}</b>
                <p>{{ statusMessage }}</p>
                <button @click="toggleStatusPage" class="btn">OK</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

const name = ref('')
const email = ref('')
const subject = ref('')
const message = ref('')
const statusMessage = ref('Your Message has been sent successfully, I will contact you very soon !')
const sendMessageStatus = ref('Thank you !')
const isLoading = ref(false)
const isShowingStatus = ref(false)

function send(e: Event) {
    e.preventDefault()
    isLoading.value = true
    toggleStatusPage()
    axios.defaults.headers.post['Content-Type'] = 'application/json'
    axios
        .post('https://formsubmit.co/ajax/fakhriaditiarahman12@gmail.com', {
            name: name.value,
            email: email.value,
            message: message.value,
        })
        .then(() => {
            email.value = ''
            name.value = ''
            message.value = ''
            isLoading.value = false
            isShowingStatus.value = true
            statusMessage.value = 'Your Message has been sent successfully, I will contact you very soon !'
            sendMessageStatus.value = 'Thank you !'
        })
        .catch(() => {
            isShowingStatus.value = true
            isLoading.value = false
            statusMessage.value = 'Some error has occured, Please try again next time !'
            sendMessageStatus.value = 'Sorry !'
        })
}

function toggleStatusPage() {
    isShowingStatus.value = !isShowingStatus.value
}
</script>

<style scoped src="../styles/contact.css"></style>
