<!--suppress CssUnusedSymbol -->
<template>
    <div class="container-fluid project-wrapper">
        <draggable v-model="sections" ghost-class="ghost" @end="onEnd">
            <transition-group class="row" type="transition" name="animation">
                <div class="col" v-for="section in sections" v-bind:key="section.id">
                    <SectionCard v-bind:section="section"/>
                </div>
            </transition-group>
        </draggable>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import draggable from 'vuedraggable'
    import SectionCard from './SectionCard';

    export default {
        name: 'Project',
        components: {
            SectionCard,
            draggable
        },
        methods: {
            ...mapActions([
                'findAllSectionsByProjectIdOrderByIndexInProject',
                'updateSection'
            ]),
            onEnd() {
                for (let i = 0; i < this.sections.length; i++) {
                    this.sections[i].indexInProject = i;
                    this.updateSection(this.sections[i])
                }
            }
        },
        computed: {
            ...mapGetters(['allSections']),
            sections: {
                get() {
                    return this.$store.state.section.sections
                },
                set(value) {
                    this.$store.commit('setSections', value)
                }
            }
        },
        created() {
            const projectId = this.$route.params.projectId;
            this.findAllSectionsByProjectIdOrderByIndexInProject(projectId);
        }
    }
</script>

<style scoped>
    .project-wrapper .sortable-drag {
        opacity: 0;
    }

    .animation-move {
        transition: transform 0.5s;
    }

    .ghost {
        opacity: 0.5;
    }
</style>
