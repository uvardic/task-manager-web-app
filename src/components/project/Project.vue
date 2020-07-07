<template>
    <div class="project-wrapper">
        <div v-for="section in allSections" v-bind:key="section.id">
            <p v-if="section.project.id === projectId">{{section.name}}</p>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'

    export default {
        name: 'Project',
        data() {
            return {
                projectId: this.$route.params.projectId
            }
        },
        methods: {
            ...mapActions(['findAllSectionsByProjectIdOrderByIndexInProject'])
        },
        computed: {
            ...mapGetters(['allSections']),
        },
        created() {
            const projectId = this.$route.params.projectId;
            this.findAllSectionsByProjectIdOrderByIndexInProject(projectId);
        }
    }
</script>

<style scoped>

</style>
