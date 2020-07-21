<template>
    <form @submit="createProject">
        <div class="input-group margin-top">
            <label for="projectNameInput"/>
            <input type="text" v-model="name" class="form-control" placeholder="Project name" id="projectNameInput">
            <div class="input-group-append">
                <button class="btn btn-outline-primary" type="submit">Create Project</button>
            </div>
        </div>
    </form>
</template>

<script>
    import {mapActions} from 'vuex'

    export default {
        name: 'DashboardSaveProject',
        data() {
            return {
                name: ''
            }
        },
        methods: {
            ...mapActions(['saveProject']),

            createProject(e) {
                e.preventDefault()

                let hasErrors = false

                if (!this.name) {
                    this.$notify({
                        group: 'errors',
                        title: 'Create project error',
                        text: `Name can't be empty!`
                    })
                    hasErrors = true
                }

                if (!hasErrors)
                    this.saveProject({ name: this.name })
            }
        }
    }
</script>

<style scoped>

</style>
