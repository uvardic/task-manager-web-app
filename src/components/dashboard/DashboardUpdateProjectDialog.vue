<template>
    <div v-if="getUpdateProjectDialog.show">
        <transition name="overlay-animation" appear>
            <div class="modal-overlay"/>
        </transition>
        <transition name="dialog-animation">
            <form class="dialog" @submit="onSubmit">
                <div class="form-group">
                    <label for="projectNameInput">Project name</label>
                    <input type="text"
                           class="form-control"
                           v-model="name"
                           id="projectNameInput"
                           placeholder="Project name"
                    >
                </div>
                <button type="submit" class="btn btn-primary" style="margin-right: 10px">Update</button>
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
        name: 'DashboardDeleteProjectDialog',

        data() {
            return {
                name: '',
                errors: []
            }
        },

        computed: {
            ...mapGetters(['getUpdateProjectDialog'])
        },

        methods: {
            ...mapActions([
                'updateProject',
                'toggleUpdateProjectDialog'
            ]),

            onSubmit(e) {
                e.preventDefault()

                if (!this.name)
                    this.errors.push(`Name can't be empty!`)

                if (this.errors.length)
                    return

                const existingId = this.getUpdateProjectDialog.project.id

                const request = {
                    name: this.name
                }

                this.updateProject({ existingId, request })
                this.toggleUpdateProjectDialog()
            },

            cancelAction() {
                this.toggleUpdateProjectDialog()
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
