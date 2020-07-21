<template>
    <div class="container">
        <CreateProject class="margin-top"/>

        <ul class="list-group margin-top">
            <li class="list-group-item active">Projects</li>
            <li v-if="isFetchingProjects && !getProjects.length" class="list-group-item">Loading...</li>
            <li v-if="!isFetchingProjects && !getProjects.length" class="list-group-item">
                No projects found, please create a project.
            </li>
            <li class="list-group-item" v-for="project in getProjects" :key="project.id">
                <DashboardProject :project="project"/>
            </li>
        </ul>

        <UpdateProjectDialog/>
        <DeleteProjectDialog/>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'

    import DashboardProject from './DashboardProject'
    import CreateProject from '../project/CreateProject'
    import UpdateProjectDialog from '../project/UpdateProjectDialog'
    import DeleteProjectDialog from '../project/DeleteProjectDialog'

    export default {
        name: 'Dashboard',
        components: {
            DashboardProject,
            CreateProject,
            UpdateProjectDialog,
            DeleteProjectDialog
        },
        data() {
            return {
                pollingInterval: null
            }
        },
        computed: {
            ...mapGetters([
                'isFetchingProjects',
                'getProjects'
            ])
        },
        methods: {
            ...mapActions(['findAllProjects']),

            pollProjects() {
                this.pollingInterval = setInterval(
                    () => this.findAllProjects(),
                    3000
                )
            }
        },
        created() {
            this.findAllProjects()
            this.pollProjects()
        },
        beforeDestroy() {
            clearInterval(this.pollingInterval)
        }
    }
</script>

<style scoped>
    .margin-top {
        margin-top: 5%;
    }
</style>
