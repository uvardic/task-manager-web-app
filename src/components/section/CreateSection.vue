<template>
    <form @submit="onSubmit">
        <div class="input-group margin-top">
            <label for="sectionNameInput"/>
            <input type="text" v-model="name" class="form-control" placeholder="Section name" id="sectionNameInput">
            <div class="input-group-append">
                <button class="btn btn-outline-primary" type="submit">Create Section</button>
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
    import {mapActions, mapGetters} from 'vuex'

    export default {
        name: 'CreateSection',
        data() {
            return {
                name: '',
                errors: []
            }
        },
        computed: {
            ...mapGetters([
                'getSections',
                'getProjectById',
                'getSectionsByProjectId'
            ])
        },
        methods: {
            ...mapActions(['saveSection']),

            onSubmit(e) {
                e.preventDefault()
                this.erros = []

                if (!this.name)
                    this.erros.push(`Name can't be empty!`)

                if (this.erros.length) return

                const projectId = this.$route.params.projectId
                const sections = this.getSectionsByProjectId(projectId)
                const sequence = sections.length ? sections[sections.length - 1].sequence + 16000 : 16000

                this.saveSection({
                    name: this.name,
                    sequence,
                    project: {
                        id: projectId
                    }
                })
            },

        }
    }
</script>

<style scoped>

</style>
