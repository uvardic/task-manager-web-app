<template>
    <div class="card">
        <div class="card-header">
            <h3 v-if="!renaming" @click="renamingStarted">{{section.name}}</h3>
            <input v-model="newName" v-if="renaming" @keypress="renamingFinished" type="text">
        </div>
        <div class="card-body">
            <ul>
                <li>Task 1</li>
                <li>Task 1</li>
                <li>Task 1</li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'

    export default {
        name: 'SectionCard',
        props: ['section'],
        data() {
            return {
                renaming: false,
                newName: ''
            }
        },
        methods: {
            ...mapActions(['updateSection']),
            renamingStarted() {
                this.renaming = true
            },
            renamingFinished(e) {
                if (e.key !== 'Enter')
                    return

                this.renaming = false
                this.section.name = this.newName
                this.updateSection(this.section)
            }
        }
    }
</script>

<style scoped>

</style>
