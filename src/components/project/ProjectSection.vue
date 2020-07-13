<template>
    <div class="card">
        <div class="card-header">
            <div class="row">
                <h4 class="col-10">{{ section.name }}</h4>
                <b-dropdown class="col-2" variant="none">
                    <b-dropdown-item @click="updateAction">Update Section</b-dropdown-item>
                    <b-dropdown-item @click="deleteAction">Delete Section</b-dropdown-item>
                    <b-dropdown-divider/>
                    <b-dropdown-item>Create Task</b-dropdown-item>
                </b-dropdown>
            </div>
        </div>

        <div class="card-body">
        </div>

        <div class="card-footer"/>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'

    export default {
        name: 'ProjectSection',
        props: ['section'],
        data() {
            return {
                showMenu: false,
                showSubmenu: false
            }
        },
        methods: {
            ...mapActions([
                'toggleDeleteSectionDialog',
                'toggleUpdateSectionDialog'
            ]),

            deleteAction() {
                this.toggleDeleteSectionDialog(this.section)
            },

            updateAction() {
                this.toggleUpdateSectionDialog(this.section)
            }
        }
    }
</script>

<style scoped>
</style>
