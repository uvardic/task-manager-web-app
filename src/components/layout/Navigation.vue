<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light" :class="{'navbarOpen': show}">
        <router-link class="navbar-brand" to="/">Task Manager</router-link>
        <button class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
                @click.stop="toggleNavigation"
        >
            <span class="navbar-toggler-icon"/>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent" :class="{ 'show': show }">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <router-link class="nav-link" to="/">Dashboard</router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
    export default {
        name: 'Navigation',

        data() {
            return {
                show: true
            }
        },

        methods: {
            toggleNavigation() {
                this.show = !this.show
            }
        }
    }
</script>

<style scoped>

</style>
