<template>
    <div class="card section-wrapper">
        <div class="card-header">
            <h3 v-if="!renaming" @click="renamingStarted">{{section.name}}</h3>
            <input v-model="newName" v-if="renaming" @keypress="renamingFinished" type="text">
        </div>
        <div class="card-body">
            <draggable ghost-class="ghost">
                <transition-group type="transition" name="animation">
                    <div v-for="task in allTasks" v-bind:key="task.id">
                        <TaskCard v-if="task.section.id === sectionId" v-bind:task="task"/>
                    </div>
                </transition-group>
            </draggable>
        </div>
        <div class="card-footer">
            <button class="btn btn-secondary" @click="taskForm">Create Task</button>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters, mapMutations} from 'vuex'
    import TaskCard from './TaskCard';
    import draggable from 'vuedraggable'

    export default {
        name: 'SectionCard',
        props: ['section'],
        components: {
            TaskCard,
            draggable,
        },
        data() {
            return {
                renaming: false,
                newName: '',
                sectionId: this.section.id
            }
        },
        methods: {
            ...mapActions([
                'updateSection',
                'findAllTasks',
                'findAllTasksBySectionIdOrderByIndexInSection',
                'toggleTaskForm'
            ]),
            ...mapMutations(['setTaskFormSectionId']),
            renamingStarted() {
                this.renaming = true
            },
            renamingFinished(e) {
                if (e.key !== 'Enter')
                    return

                this.renaming = false
                this.section.name = this.newName
                this.updateSection(this.section)
            },
            taskForm() {
                this.toggleTaskForm()
                this.setTaskFormSectionId(this.section.id)
            }
        },
        computed: {
            ...mapGetters(['allTasks'])
        },
        created() {
            this.findAllTasks(this.section.id)
            console.log(this.allTasks)
        }
    }
</script>

<!--suppress CssUnusedSymbol -->
<style scoped>
    .section-wrapper .sortable-drag {
        opacity: 0;
    }

    .animation-move {
        transition: transform 0.5s;
    }

    .ghost {
        opacity: 0.5;
    }
</style>
