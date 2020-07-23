<template>
    <div class="container margin-top">
        <p v-if="isFetchingTasks">Loading...</p>
        <div v-if="!isFetchingTasks">
            <h2>{{ task.name }}</h2>
            <p>{{ task.description ? task.description : 'No description was provided' }}</p>
            <div class="margin-top">
                <Comment v-for="comment in getComments" :key="comment.id" :comment="comment"/>
            </div>
            <CreateComment/>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'

    import CreateComment from '../comment/CreateComment'
    import Comment from '../comment/Comment'

    export default {
        name: 'Task',
        components: {
            CreateComment,
            Comment
        },
        data() {
            return {
                pollingInterval: null
            }
        },
        computed: {
            ...mapGetters([
                'isFetchingTasks',
                'getTaskById',
                'getComments'
            ]),

            task: {
                get() {
                    return this.getTaskById(this.$route.params.taskId)
                }
            }
        },
        methods: {
            ...mapActions([
                'findTaskById',
                'findAllCommentsByTaskId'
            ]),

            pollComments() {
                const timeout = 3000
                this.pollingInterval = setInterval(
                    () => this.findAllCommentsByTaskId(this.$route.params.taskId),
                    timeout
                )
            }
        },
        created() {
            const taskId = this.$route.params.taskId
            this.findTaskById(taskId)
            this.findAllCommentsByTaskId(taskId)
            this.pollComments()
        },
        beforeDestroy() {
            clearInterval(this.pollingInterval)
        }
    }
</script>

<style scoped>
    .margin-top {
        margin-top: 3%;
    }
</style>
