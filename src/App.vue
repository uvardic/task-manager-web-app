<template>
    <div id="app">
        <Navigation/>
        <router-view/>
    </div>
</template>

<script>
    import Navigation from './components/layout/Navigation'

    export default {
        name: 'App',

        components: {
            Navigation
        }
    }
</script>

<style>
    * {
        padding: 0;
        margin: 0;
    }
</style>
