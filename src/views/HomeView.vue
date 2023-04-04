<script setup lang="ts">
import IndexComponent from "../components/IndexComponent.vue";
</script>

<template>
    <!-- Hero section -->
    <section class="hero is-primary is-bold is-fullheight-with-navbar">
        <div class="hero-body">
            <div class="container">
                <h1 class="title">
                    Knag
                </h1>
                <h2 class="subtitle">
                    Algorithmic Trading Made Easy
                </h2>
                <router-link class="button is-light is-medium" to="/register">Get started</router-link>
            </div>
        </div>
    </section>

    <!-- Features section -->
    <section class="section">
        <div class="container">
            <h2 class="title is-2">Features</h2>
            <div class="columns">
                <div class="column">
                    <div class="card">
                        <div class="card-content">
                            <p class="title is-4">Algorithmic Trading</p>
                            <p class="subtitle is-6">Our advanced algorithms trade on your behalf, 24/7</p>
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="card">
                        <div class="card-content">
                            <p class="title is-4">Real-time Data</p>
                            <p class="subtitle is-6">Get real-time market data to make informed decisions</p>
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="card">
                        <div class="card-content">
                            <p class="title is-4">Easy to Use</p>
                            <p class="subtitle is-6">Our platform is designed with simplicity in mind</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- Pricing section -->
    <section class="section has-background-primary">
        <div class="container has-background-primary">
            <h2 class="title is-2 has-text-primary-light">Pricing</h2>
            <div class="columns">
                <div class="column">
                    <div class="card">
                        <div class="card-content">
                            <p class="title is-4">Basic Plan</p>
                            <p class="subtitle is-6">For traders just starting out</p>
                            <p class="has-text-weight-bold is-size-4">Free</p>
                            <ul class="block-list is-centered py-2">
                                <li>Access to our algorithmic trading platform</li>
                                <li>Real-time market data</li>
                                <li>Basic support</li>
                            </ul>
                            <a class="button is-primary" href="#">Sign up</a>
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="card">
                        <div class="card-content">
                            <p class="title is-4">Pro Plan</p>
                            <p class="subtitle is-6">For experienced traders</p>
                            <p class="has-text-weight-bold is-size-4">$99/month</p>
                            <ul class="block-list is-centered py-2">
                                <li>Access to our algorithmic trading platform</li>
                                <li>Real-time market data</li>
                                <li>Priority support</li>
                                <li>Advanced features</li>
                            </ul>
                            <a class="button is-primary" href="#">Sign up</a>
                        </div>
                    </div>
                </div>
                <div class="column">
                    <div class="card">
                        <div class="card-content">
                            <p class="title is-4">Enterprise Plan</p>
                            <p class="subtitle is-6">For large trading firms</p>
                            <p class="has-text-weight-bold is-size-4">Contact us</p>
                            <ul class="block-list is-centered py-2">
                                <li>Custom solutions tailored to your needs</li>
                                <li>Real-time market data</li>
                                <li>Premium support</li>
                                <li>Advanced features</li>
                            </ul>
                            <a class="button is-primary" href="#">Contact us</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

</template>
