<template>
    <div v-if="taskForm.show">
        <transition name="overlay-animation" appear>
            <div class="modal-overlay"/>
        </transition>
        <transition name="form-animation">
            <div class="form-dialog">
                <form @submit="onSubmit">
                    <div class="form-group">
                        <label for="task-name-input">Task name</label>
                        <input type="text" v-model="name" class="form-control" id="task-name-input" placeholder="Name">
                    </div>
                    <div class="form-group">
                        <label for="task-description-input">Task description</label>
                        <textarea v-model="description" class="form-control" id="task-description-input" placeholder="Description"/>
                    </div>
                    <button type="submit" class="btn btn-primary">Create</button>
                    <span style="padding-right: 10px"/>
                    <button class="btn btn-secondary" @click="toggleTaskForm">Cancel</button>
                </form>
            </div>
        </transition>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'

    export default {
        name: 'CreateTaskForm',
        data() {
            return {
                name: '',
                description: ''
            }
        },
        methods: {
            ...mapActions([
                'toggleTaskForm',
                'saveTask'
            ]),
            onSubmit(e) {
                e.preventDefault()
                const sectionId = this.taskForm.sectionId
                const numberOfTasks = this.allTasks.length
                const request = {
                    name: this.name,
                    description: this.description,
                    indexInSection: numberOfTasks,
                    section: {
                        id: sectionId
                    }
                }
                this.saveTask(request)
                this.toggleTaskForm()
            }
        },
        computed: {
            ...mapGetters([
                'taskForm',
                'allTasks'
            ])
        }
    }
</script>

<!--suppress CssUnusedSymbol -->
<style scoped>
    .modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 98;
        background-color: rgba(0, 0, 0, 0.3);
    }

    .overlay-animation-enter-active,
    .overlay-animation-leave-active {
        transition: opacity 0.5s;
    }

    .overlay-animation-enter,
    .overlay-animation-leave-to {
        opacity: 0;
    }

    .form-dialog {
        position: fixed;
        padding: 20px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 99;
        width: 100%;
        max-width: 400px;
        background-color: #fff;
        border-radius: 4px;
    }
</style>
