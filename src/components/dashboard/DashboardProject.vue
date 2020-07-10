<template>
    <div class="row" @mouseenter="mouseEnter" @mouseleave="mouseLeave">
        <div class="col-10">
            {{ project.name }}
        </div>
        <div class="col-2 d-flex justify-content-center" v-if="show">
            <div class="row">
                <button class="btn btn-primary" @click="updateAction">Update</button>
                <span class="span"/>
                <button class="btn btn-secondary" @click="deleteAction">Delete</button>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'

    export default {
        name: 'Project',

        props: ['project'],

        data() {
            return {
                show: false
            }
        },

        methods: {
            ...mapActions([
                'toggleDeleteProjectDialog',
                'toggleUpdateProjectDialog'
            ]),

            mouseEnter() {
                this.show = true
            },

            mouseLeave() {
                this.show = false
            },

            deleteAction() {
                this.toggleDeleteProjectDialog(this.project)
            },

            updateAction() {
                this.toggleUpdateProjectDialog(this.project)
            }
        }
    }
</script>

<style scoped>
    .span {
        width: 10px;
    }
</style>
