<template>
    <div class="dashboard-wrapper">
        <CreateProject/>
        <div v-for="project in allProjects" v-bind:key="project.id">
            <Project v-bind:project="project"/>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import CreateProject from './CreateProject';
    import Project from './Project';

    export default {
        name: 'Board',
        components: {
            Project, CreateProject
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
