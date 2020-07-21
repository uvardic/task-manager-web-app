<template>
    <div class="container project-wrapper">
        <CreateSection class="margin-top"/>

        <draggable class="margin-top" v-model="sections" ghost-class="ghost" @end="onDragEnd">
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
    import {mapActions, mapGetters} from 'vuex'
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
                this.updateSection({
                    existingId: currentSection.id,
                    request: currentSection
                })
            },

            pollProjects() {
                this.pollingInterval = setInterval(
                    () => {
                        const projectId = this.$route.params.projectId
                        this.findAllSectionsByProjectIdOrderBySequence(projectId)
                    },
                    3000
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
