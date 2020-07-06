<template>
    <div class="dashboard-wrapper">
        <div v-for="project in allProjects" v-bind:key="project.id">
            <Project v-bind:project="project"/>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import Project from "@/components/Project";

    export default {
        name: 'Board',
        components: {
            Project
        },
        methods: {
            ...mapActions(['findAllProjects'])
        },
        computed: {
            ...mapGetters(['allProjects'])
        },
        created() {
            this.findAllProjects();
        }
    }
</script>

<style scoped>
    .dashboard-wrapper {
        margin: 20px;
    }
</style>
