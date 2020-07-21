<template>
    <div v-if="getCreateTaskDialog.enabled">
        <transition name="overlay-animation" appear>
            <div class="modal-overlay"/>
        </transition>
        <transition name="dialog-animation">
            <form class="dialog" @submit="onSubmit">
                <div class="form-group">
                    <label for="taskNameInput">Name</label>
                    <input type="text"
                           class="form-control"
                           v-model="name"
                           id="taskNameInput"
                           placeholder="Name"
                    >
                </div>
                <div class="form-group">
                    <label for="taskDescriptionInput">Description</label>
                    <textarea class="form-control"
                              id="taskDescriptionInput"
                              rows="3"
                              placeholder="Description"
                              v-model="description"
                    />
                </div>
                <button type="submit" class="btn btn-primary" style="margin-right: 10px">Create</button>
                <button class="btn btn-secondary" @click="cancelAction">Cancel</button>
                <div v-if="errors.length">
                    <small v-for="error in errors" :key="error" class="text-danger">
                        {{ error }}
                    </small>
                </div>
            </form>
        </transition>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'

    export default {
        name: 'ProjectCreateTaskDialog',
        data() {
            return {
                name: '',
                description: '',
                errors: []
            }
        },
        computed: {
            ...mapGetters(['getCreateTaskDialog'])
        },
        methods: {
            ...mapActions([
                'saveTask',
                'toggleCreateTaskDialog'
            ]),

            onSubmit(e) {
                e.preventDefault()

                if (!this.name)
                    this.error.push(`Name can't be empty!`)

                if (this.errors.length) return

                const section = this.getCreateTaskDialog.section
                const numberOfTasks = section.tasks.length
                const sequence = numberOfTasks ? section.tasks[numberOfTasks - 1].sequence + 16000 : 16000

                this.saveTask({
                    name: this.name,
                    description: this.description,
                    sequence,
                    section
                })
                this.toggleCreateTaskDialog()
            },

            cancelAction() {
                this.toggleCreateTaskDialog()
            }
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

    .dialog {
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
