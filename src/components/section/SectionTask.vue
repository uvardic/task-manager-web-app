<template>
    <div class="task-card" @mouseenter="show = true" @mouseleave="show = false" :id="task.id">
        <div class="row">
            <div class="col-10">
                {{task.name}}
            </div>
            <b-dropdown v-if="show" class="col-2" variant="none">
                <b-dropdown-item @click="openAction">Open</b-dropdown-item>
                <b-dropdown-item @click="updateAction">Update</b-dropdown-item>
                <b-dropdown-item @click="deleteAction">Delete</b-dropdown-item>
            </b-dropdown>
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'

    export default {
        name: 'SectionTask',
        props: ['task'],
        data() {
            return {
                show: false
            }
        },
        methods: {
            ...mapActions([
                'toggleDeleteTaskDialog',
                'toggleUpdateTaskDialog'
            ]),

            deleteAction() {
                this.toggleDeleteTaskDialog(this.task)
            },

            updateAction() {
                this.toggleUpdateTaskDialog(this.task)
            },

            openAction() {
                const taskId = this.task.id
                this.$router.push(`/task/${taskId}`)
            }
        }
    }
</script>

<style scoped>
    .task-card {
        margin: 10px;
        padding: 10px;
        box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.2);
    }
</style>
