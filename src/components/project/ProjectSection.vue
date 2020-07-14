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
            <draggable :id="section.id" group="tasks" :list="section.tasks" ghost-class="ghost" @end="onDragEnd">
                <ProjectTask v-for="task in section.tasks" :key="task.id" :task="task"/>
            </draggable>
        </div>

        <div class="card-footer"/>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import draggable from 'vuedraggable'

    import ProjectTask from './ProjectTask'

    export default {
        name: 'ProjectSection',
        props: ['section'],
        data() {
            return {
                showMenu: false,
                showSubmenu: false
            }
        },
        components: {
            ProjectTask,
            draggable
        },
        computed: {
            ...mapGetters(['getSections'])
        },
        methods: {
            ...mapActions([
                'findAllTasksBySectionIdOrderBySequence',
                'toggleDeleteSectionDialog',
                'toggleUpdateSectionDialog',
                'toggleCreateTaskDialog',
                'updateTask'
            ]),

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
                const targetedSection = this.getSections.find(s => s.id === e.to.id)
                const task = targetedSection.tasks.find(t => t.id === e.item.id)
                task.section.id = e.to.id

                const previousTask = targetedSection.tasks[e.newIndex - 1]
                const nextTask = targetedSection.tasks[e.newIndex + 1]

                if (!previousTask && !nextTask) {
                    task.sequence = 16000
                } else {
                    const previousTaskSequence = previousTask ? previousTask.sequence : nextTask.sequence - 16000
                    const nextTaskSequence = nextTask ? nextTask.sequence : previousTask.sequence + 16000
                    task.sequence = (previousTaskSequence + nextTaskSequence) / 2
                }

                this.updateTask({ existingId: task.id, request: task })
            }
        },

        created() {
            this.findAllTasksBySectionIdOrderBySequence(this.$props.section.id)
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
