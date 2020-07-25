<template>
    <div class="container project-wrapper">
        <CreateSection class="margin-top"/>

        <p v-if="isFetchingSections && !sections.length">Loading...</p>
        <p v-if="!isFetchingSections && !sections.length">No sections found, please create a section.</p>
        <draggable v-if="sections.length" class="margin-top" v-model="sections" ghost-class="ghost" @end="onDragEnd">
            <transition-group class="row" type="transition" name="animation">
                <div class="col" v-for="section in sections" :key="section.id">
                    <Section :section="section"/>
                </div>
            </transition-group>
        </draggable>

        <DeleteSectionDialog/>
        <UpdateSectionDialog/>
        <CreateTaskDialog/>
        <DeleteTaskDialog/>
        <UpdateTaskDialog/>
    </div>
</template>

<script>
    import {mapActions, mapGetters, mapMutations} from 'vuex'
    import draggable from 'vuedraggable'

    import CreateSection from '../section/CreateSection'
    import Section from '../section/Section'
    import DeleteSectionDialog from '../section/DeleteSectionDialog'
    import UpdateSectionDialog from '../section/UpdateSectionDialog'
    import CreateTaskDialog from '../task/CreateTaskDialog'
    import DeleteTaskDialog from '../task/DeleteTaskDialog'
    import UpdateTaskDialog from '../task/UpdateTaskDialog';

    export default {
        name: 'Project',
        components: {
            draggable,
            CreateSection,
            Section,
            DeleteSectionDialog,
            UpdateSectionDialog,
            CreateTaskDialog,
            DeleteTaskDialog,
            UpdateTaskDialog
        },
        data() {
            return {
                pollingInterval: null
            }
        },
        computed: {
            ...mapGetters([
                'isFetchingSections',
                'getSections'
            ]),

            sections: {
                get() {
                    return this.getSections
                },
                set(sections) {
                    this.setSections(sections)
                }
            }

        },
        methods: {
            ...mapActions([
                'findAllSectionsByProjectIdOrderBySequence',
                'updateSection',
            ]),

            ...mapMutations(['setSections']),

            onDragEnd(e) {
                const previousSection = this.getSections[e.newIndex - 1]
                const nextSection = this.getSections[e.newIndex + 1]

                if (!previousSection && !nextSection) return

                const previousSectionSequence = previousSection ? previousSection.sequence : nextSection.sequence / 2
                const nextSectionSequence = nextSection ? nextSection.sequence : previousSection.sequence * 2
                const draggedSection = this.getSections[e.newIndex]

                draggedSection.sequence = (previousSectionSequence + nextSectionSequence) / 2
                this.updateSection({
                    existingId: draggedSection.id,
                    request: draggedSection
                })
            },

            pollProjects() {
                const timeout = 3000
                this.pollingInterval = setInterval(
                    () => {
                        const projectId = this.$route.params.projectId
                        this.findAllSectionsByProjectIdOrderBySequence(projectId)
                    },
                    timeout
                )
            }
        },
        created() {
            const projectId = this.$route.params.projectId
            this.findAllSectionsByProjectIdOrderBySequence(projectId)
            this.pollProjects()
        },
        beforeDestroy() {
            clearInterval(this.pollingInterval)
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
