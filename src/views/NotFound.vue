<template>
    <div class="not-found view-page">
        <div class="text">
            <div class="title">
                <div class="outline-text" aria-hidden="true">404</div>
                <h1 aria-label="Page Not Found">
                    <span class="letters" aria-hidden="true">
                        <span class="hov">P</span>
                        <span class="hov">a</span>
                        <span class="hov">g</span>
                        <span class="hov">e</span>
                        <span class="space"></span>
                        <span class="hov">N</span>
                        <span class="hov">o</span>
                        <span class="hov">t</span>
                        <span class="space"></span>
                        <span class="hov">F</span>
                        <span class="hov">o</span>
                        <span class="hov">u</span>
                        <span class="hov">n</span>
                        <span class="hov">d</span>
                    </span>
                </h1>
            </div>
            <p class="desc">The page you are looking for does not exist or has been moved.</p>
            <router-link to="/" class="btn">Back to Home</router-link>
        </div>
    </div>
</template>

<style scoped>
.not-found {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.not-found .text {
    text-align: center;
    align-items: center;
}

.not-found .desc {
    margin: 20px 0;
    font-size: var(--font-body);
}

.not-found .btn {
    margin-top: 1rem;
}
</style>
