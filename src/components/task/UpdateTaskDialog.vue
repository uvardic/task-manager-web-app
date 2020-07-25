<template>
    <div v-if="getUpdateTaskDialog.enabled">
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
                              v-model="description"
                              placeholder="Description"
                    />
                </div>
                <button type="submit" class="btn btn-primary" style="margin-right: 10px">Update</button>
                <button class="btn btn-secondary" @click="cancelAction">Cancel</button>
            </form>
        </transition>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'

    export default {
        name: 'UpdateTaskDialog',
        data() {
            return {
                name: '',
                description: ''
            }
        },
        computed: {
            ...mapGetters(['getUpdateTaskDialog'])
        },
        methods: {
            ...mapActions([
                'updateTask',
                'toggleUpdateTaskDialog'
            ]),

            onSubmit(e) {
                e.preventDefault()

                const existingId = this.getUpdateTaskDialog.resource.id
                const request = this.getUpdateTaskDialog.resource

                request.name = this.name ? this.name : request.name
                request.description = this.description ? this.description : request.description

                this.updateTask({ existingId, request })
                this.toggleUpdateTaskDialog()
            },

            cancelAction() {
                this.toggleUpdateTaskDialog()
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
