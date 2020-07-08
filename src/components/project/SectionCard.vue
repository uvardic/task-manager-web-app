<!--suppress CssUnusedSymbol -->
<template>
    <div class="card section-wrapper">
        <div class="card-header">
            <h3 v-if="!renaming" @click="renamingStarted">{{section.name}}</h3>
            <input v-model="newName" v-if="renaming" @keypress="renamingFinished" type="text">
        </div>
        <div class="card-body">
            <draggable ghost-class="ghost">
                <transition-group type="transition" name="animation">
                    <TaskCard v-bind:key="1" task="taks 1"/>
                    <TaskCard v-bind:key="2" task="taks 2"/>
                    <TaskCard v-bind:key="3" task="taks 3"/>
                </transition-group>
            </draggable>
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    import TaskCard from './TaskCard';
    import draggable from 'vuedraggable'

    export default {
        name: 'SectionCard',
        props: ['section'],
        components: {
            TaskCard,
            draggable
        },
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
    .section-wrapper .sortable-drag {
        opacity: 0;
    }

    .animation-move {
        transition: transform 0.5s;
    }

    .ghost {
        opacity: 0.5;
    }
</style>
