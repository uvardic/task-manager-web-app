<template>
    <div class="dashboard-wrapper">
        <CreateProjectForm/>
        <div v-for="project in allProjects" v-bind:key="project.id">
            <ProjectCard v-bind:project="project"/>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import CreateProjectForm from './CreateProjectForm';
    import ProjectCard from './ProjectCard';

    export default {
        name: 'Board',
        components: {
            ProjectCard, CreateProjectForm
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
