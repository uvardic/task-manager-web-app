<template>
    <div class="card">
        <div class="card-header">
            <div class="row">
                <h4 class="col-10">{{ section.name }}</h4>
                <b-dropdown class="col-2" variant="none">
                    <b-dropdown-item @click="updateAction">Update Section</b-dropdown-item>
                    <b-dropdown-item @click="deleteAction">Delete Section</b-dropdown-item>
                    <b-dropdown-divider/>
                    <b-dropdown-item @click="createTaskAction">Create Task</b-dropdown-item>
                </b-dropdown>
            </div>
        </div>

        <div class="card-body task-wrapper">
            <draggable :id="section.id" group="tasks" :list="tasks" ghost-class="ghost" @end="onDragEnd">
                <SectionTask v-for="task in tasks" :key="task.id" :task="task"/>
            </draggable>
        </div>

        <div class="card-footer"/>
    </div>
</template>

<script>
    import {mapActions, mapGetters, mapMutations} from 'vuex'
    import draggable from 'vuedraggable'

    import SectionTask from './SectionTask'

    export default {
        name: 'Section',
        props: ['section'],
        data() {
            return {
                showMenu: false,
                pollingInterval: null
            }
        },
        components: {
            SectionTask,
            draggable
        },
        computed: {
            ...mapGetters([
                'getSections',
                'getSectionById',
                'getTaskById',
                'getTasksBySectionId'
            ]),

            tasks: {
                get() {
                    return this.getTasksBySectionId(this.section.id)
                },
                set(tasks) {
                    this.setTasks(tasks)
                }
            }
        },
        methods: {
            ...mapActions([
                'findAllTasksBySectionIdOrderBySequence',
                'toggleDeleteSectionDialog',
                'toggleUpdateSectionDialog',
                'toggleCreateTaskDialog',
                'updateTask'
            ]),

            ...mapMutations(['setTasks']),

            deleteAction() {
                this.toggleDeleteSectionDialog(this.section)
            },

            updateAction() {
                this.toggleUpdateSectionDialog(this.section)
            },

            createTaskAction() {
                this.toggleCreateTaskDialog(this.section)
            },

            onDragEnd(e) {
                const previousTask = this.tasks[e.newIndex - 1]
                const nextTask = this.tasks[e.newIndex + 1]
                const draggedTask = this.getTaskById(e.item.id)

                if (!previousTask && !nextTask) {
                    draggedTask.sequence = 16000
                } else {
                    const previousTaskSequence = previousTask ? previousTask.sequence : nextTask.sequence - 16000
                    const nextTaskSequence = nextTask ? nextTask.sequence : previousTask.sequence + 16000
                    draggedTask.sequence = (previousTaskSequence + nextTaskSequence) / 2
                }

                draggedTask.section.id = e.to.id
                this.updateTask({
                    existingId: draggedTask.id,
                    request: draggedTask
                })
            },

            pollTasks() {
                const timeout = 3000
                this.pollingInterval = setInterval(
                    () => this.findAllTasksBySectionIdOrderBySequence(this.section.id),
                    timeout
                )
            }
        },
        created() {
            this.findAllTasksBySectionIdOrderBySequence(this.section.id)
            this.pollTasks()
        },
        beforeDestroy() {
            clearInterval(this.pollingInterval)
        }
    }
</script>

<!--suppress CssUnusedSymbol -->
<style scoped>
    .task-wrapper .sortable-drag {
        opacity: 0;
    }

    .animation-move {
        transition: transform 0.5s;
    }

    .ghost {
        opacity: 0.5;
    }
</style>
