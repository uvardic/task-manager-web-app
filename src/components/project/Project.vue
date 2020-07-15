<template>
    <div class="container project-wrapper">
        <ProjectCreateSection class="margin-top"/>

        <draggable class="margin-top" v-model="sections" ghost-class="ghost" @end="onDragEnd">
            <transition-group class="row" type="transition" name="animation">
                <div class="col" v-for="section in sections" :key="section.id">
                    <ProjectSection :section="section"/>
                </div>
            </transition-group>
        </draggable>

        <ProjectDeleteSectionDialog/>
        <ProjectUpdateSectionDialog/>
        <ProjectCreateTaskDialog/>
        <ProjectDeleteTaskDialog/>
        <ProjectUpdateTaskDialog/>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import draggable from 'vuedraggable'

    import ProjectCreateSection from './ProjectCreateSection'
    import ProjectSection from './ProjectSection'
    import ProjectDeleteSectionDialog from './ProjectDeleteSectionDialog'
    import ProjectUpdateSectionDialog from './ProjectUpdateSectionDialog'
    import ProjectCreateTaskDialog from './ProjectCreateTaskDialog'
    import ProjectDeleteTaskDialog from './ProjectDeleteTaskDialog'
    import ProjectUpdateTaskDialog from './ProjectUpdateTaskDialog';

    export default {
        name: 'Project',
        components: {
            draggable,
            ProjectCreateSection,
            ProjectSection,
            ProjectDeleteSectionDialog,
            ProjectUpdateSectionDialog,
            ProjectCreateTaskDialog,
            ProjectDeleteTaskDialog,
            ProjectUpdateTaskDialog
        },
        computed: {
            ...mapGetters(['getSections']),

            sections: {
                get() {
                    return this.getSections
                },
                set(value) {
                    this.$store.commit('setAllSections', value)
                }
            }

        },
        methods: {
            ...mapActions([
                'findAllSectionsByProjectIdOrderBySequence',
                'findAllProjects',
                'updateSection',
            ]),

            onDragEnd(e) {
                const previousSection = this.getSections[e.newIndex - 1]
                const nextSection = this.getSections[e.newIndex + 1]

                if (!previousSection && !nextSection) return

                const previousSectionSequence = previousSection ? previousSection.sequence : nextSection.sequence - 16000
                const nextSectionSequence = nextSection ? nextSection.sequence : previousSection.sequence + 16000

                const currentSection = this.getSections[e.newIndex]

                currentSection.sequence = (previousSectionSequence + nextSectionSequence) / 2
                this.updateSection({ existingId: currentSection.id, request: currentSection })
            }
        },
        created() {
            const projectId = this.$route.params.projectId
            this.findAllProjects()
            this.findAllSectionsByProjectIdOrderBySequence(projectId)
        }
    }
</script>

<!--suppress CssUnusedSymbol -->
<style scoped>
    .margin-top {
        margin-top: 5%;
    }

    .project-wrapper .sortable-drag {
        opacity: 0;
    }

    .animation-move {
        transition: transform 0.5s;
    }

    .ghost {
        opacity: 0.5;
    }
</style>
