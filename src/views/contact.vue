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
                <form @submit.prevent="send" class="form" aria-label="Contact form">
                    <input type="text" v-model="honey" name="bot-field" class="sr-only" tabindex="-1"
                        autocomplete="off" aria-hidden="true" />
                    <div class="input-wrapper">
                        <label for="name" class="sr-only">Name</label>
                        <input type="text" placeholder="Name" required v-model="name" name="name" id="name"
                            class="input" autocomplete="name" maxlength="80" />

                        <label for="email" class="sr-only">Email address</label>
                        <input type="email" placeholder="Email address" name="email" required v-model="email" id="email"
                            class="input" autocomplete="email" maxlength="120" />
                    </div>
                    <label for="subject" class="sr-only">Subject</label>
                    <input type="text" placeholder="Subject" required v-model="subject" name="subject" id="subject"
                        class="input" maxlength="150" />
                    <label for="message" class="sr-only">Message</label>
                    <textarea id="message" cols="30" rows="10" placeholder="Your Message" name="message" required
                        v-model="message" class="textarea" maxlength="5000"></textarea>
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
                            <button type="submit" class="btn" :disabled="status === 'sending'"
                                :aria-busy="status === 'sending'">
                                {{ status === 'sending' ? 'Sending…' : 'Send Message!' }}
                            </button>
                        </div>
                    </div>
                </form>
            </div>

        </div>

        <div v-if="overlayOpen" ref="overlayEl" class="loader" role="status" aria-live="polite" tabindex="-1"
            @keydown.esc="closeOverlay" @click.self="closeOverlay">
            <div class="lds-ring" v-if="status === 'sending'" aria-label="Sending your message"></div>
            <div v-else class="message-status">
                <b>{{ overlayTitle }}</b>
                <p>{{ overlayMessage }}</p>
                <a v-if="status === 'error'" class="btn fallback"
                    href="mailto:fakhriaditiarahman12@gmail.com?subject=Message%20from%20your%20portfolio">
                    Email me directly
                </a>
                <button ref="okButton" @click="closeOverlay" class="btn">OK</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'

type Status = 'idle' | 'sending' | 'success' | 'error'

const REQUEST_TIMEOUT = 15000

const name = ref('')
const email = ref('')
const subject = ref('')
const message = ref('')
const honey = ref('')
const status = ref<Status>('idle')
const overlayOpen = ref(false)
const overlayEl = ref<HTMLElement | null>(null)
const okButton = ref<HTMLButtonElement | null>(null)

const overlayTitle = computed(() => (status.value === 'error' ? 'Sorry!' : 'Thank you!'))

const overlayMessage = computed(() =>
    status.value === 'error'
        ? 'Your message could not be sent. Please try again in a moment, or email me directly.'
        : 'Your message has been sent successfully, I will contact you very soon!'
)

watch(overlayOpen, async (isOpen) => {
    if (!isOpen) return
    await nextTick()
    overlayEl.value?.focus()
})

watch(status, async (value) => {
    if (value !== 'success' && value !== 'error') return
    await nextTick()
    okButton.value?.focus()
})

async function send() {
    if (status.value === 'sending') return

    status.value = 'sending'
    overlayOpen.value = true

    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT)

    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            signal: controller.signal,
            body: JSON.stringify({
                name: name.value,
                email: email.value,
                subject: subject.value,
                message: message.value,
                'bot-field': honey.value,
            }),
        })

        const data = (await response.json().catch(() => ({}))) as { ok?: boolean }

        if (!response.ok || !data.ok) {
            throw new Error(`Request failed with status ${response.status}`)
        }

        name.value = ''
        email.value = ''
        subject.value = ''
        message.value = ''
        honey.value = ''
        status.value = 'success'
    } catch {
        status.value = 'error'
    } finally {
        clearTimeout(timer)
    }
}

function closeOverlay() {
    if (status.value === 'sending') return
    overlayOpen.value = false
    status.value = 'idle'
}
</script>

<style scoped src="../styles/contact.css"></style>
