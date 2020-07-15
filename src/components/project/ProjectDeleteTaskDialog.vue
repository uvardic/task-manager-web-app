<template>
    <div v-if="getDeleteTaskDialog.show">
        <transition name="overlay-animation" appear>
            <div class="modal-overlay"/>
        </transition>
        <transition name="dialog-animation">
            <div class="dialog">
                <p>Are you sure you wan't to delete {{ getDeleteTaskDialog.task.name }} ?</p>
                <button class="btn btn-primary" style="margin-right: 10px" @click="confirmAction">Confirm</button>
                <button class="btn btn-secondary" @click="cancelAction">Cancel</button>
            </div>
        </transition>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'

    export default {
        name: 'ProjectDeleteTaskDialog',
        computed: {
            ...mapGetters(['getDeleteTaskDialog'])
        },
        methods: {
            ...mapActions([
                'deleteTaskById',
                'toggleDeleteTaskDialog'
            ]),

            confirmAction() {
                const existingId = this.getDeleteTaskDialog.task.id

                this.deleteTaskById(existingId)
                this.toggleDeleteTaskDialog()
            },

            cancelAction() {
                this.toggleDeleteTaskDialog()
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
