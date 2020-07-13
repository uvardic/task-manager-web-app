<template>
    <div class="container">
        <DashboardSaveProject class="margin-top"/>

        <ul class="list-group margin-top">
            <li class="list-group-item active">Projects</li>
            <li v-if="!getProjects.length" class="list-group-item">
                No projects found, please create a project.
            </li>
            <li class="list-group-item"
                v-for="project in getProjects"
                :key="project.id"
            >
                <DashboardProject :project="project"/>
            </li>
        </ul>
        <DashboardDeleteProjectDialog/>
        <DashboardUpdateProjectDialog/>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'

    import DashboardProject from './DashboardProject'
    import DashboardSaveProject from './DashboardCreateProject'
    import DashboardDeleteProjectDialog from './DashboardUpdateProjectDialog'
    import DashboardUpdateProjectDialog from './DashboardDeleteProjectDialog'

    export default {
        name: 'Dashboard',
        components: {
            DashboardProject,
            DashboardSaveProject,
            DashboardDeleteProjectDialog,
            DashboardUpdateProjectDialog
        },
        computed: {
            ...mapGetters(['getProjects'])
        },
        methods: {
            ...mapActions(['findAllProjects']),
        },
        created() {
            this.findAllProjects()
        }
    }
</script>

<style scoped>
    .margin-top {
        margin-top: 5%;
    }
</style>
