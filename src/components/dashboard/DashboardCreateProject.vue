<template>
    <form @submit="onSubmit">
        <div class="input-group margin-top">
            <label for="projectNameInput"/>
            <input type="text" v-model="name" class="form-control" placeholder="Project name" id="projectNameInput">
            <div class="input-group-append">
                <button class="btn btn-outline-primary" type="submit">Create Project</button>
            </div>
        </div>
        <div v-if="errors.length">
            <small v-for="error in errors" :key="error" class="text-danger">
                {{ error }}
            </small>
        </div>
    </form>
</template>

<script>
    import {mapActions} from 'vuex'

    export default {
        name: 'DashboardSaveProject',

        data() {
            return {
                name: '',
                errors: []
            }
        },

        methods: {
            ...mapActions(['saveProject']),

            onSubmit(e) {
                e.preventDefault()
                this.errors = []

                if (!this.name)
                    this.errors.push(`Name can't be empty!`)

                if (this.errors.length)
                    return

                this.saveProject({ name: this.name })
            }
        }
    }
</script>

<style scoped>

</style>
