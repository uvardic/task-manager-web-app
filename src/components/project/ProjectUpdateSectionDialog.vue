<template>
    <div v-if="getUpdateSectionDialog.show">
        <transition name="overlay-animation" appear>
            <div class="modal-overlay"/>
        </transition>
        <transition name="dialog-animation">
            <form class="dialog" @submit="onSubmit">
                <div class="form-group">
                    <label for="sectionNameInput">Name</label>
                    <input type="text"
                           class="form-control"
                           v-model="name"
                           id="sectionNameInput"
                           placeholder="Name"
                    >
                </div>
                <div class="form-group">
                    <label for="sectionProjectInput">Project</label>
                    <select class="form-control" id="sectionProjectInput" v-model="project">
                        <option v-for="project in getProjects" :key="project.id" :value="project">
                            {{ project.name }}
                        </option>
                    </select>
                </div>
                <button type="submit" class="btn btn-primary" style="margin-right: 10px">Update</button>
                <button class="btn btn-secondary" @click="cancelAction">Cancel</button>
            </form>
        </transition>
    </div>
</template>

<script>
    import {mapActions, mapGetters, mapMutations} from 'vuex'

    export default {
        name: 'ProjectUpdateSectionDialog',
        data() {
            return {
                name: '',
                project: ''
            }
        },
        computed: {
            ...mapGetters([
                'getUpdateSectionDialog',
                'getProjects'
            ])
        },
        methods: {
            ...mapActions([
                'updateSection',
                'toggleUpdateSectionDialog'
            ]),

            ...mapMutations(['removeSection']),

            onSubmit(e) {
                e.preventDefault()

                const existingId = this.getUpdateSectionDialog.section.id
                const request = this.getUpdateSectionDialog.section

                request.name = this.name ? this.name : request.name

                if (this.project && this.project.id !== request.project.id) {
                    const lastSection = this.project.sections[this.project.sections.length - 1]
                    request.sequence = lastSection ? lastSection.sequence + 16000 : 16000
                    request.project = this.project
                    this.removeSection(existingId)
                }

                this.updateSection({ existingId, request })
                this.toggleUpdateSectionDialog()
            },

            cancelAction() {
                this.toggleUpdateSectionDialog()
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
