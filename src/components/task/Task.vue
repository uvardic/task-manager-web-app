<template>
    <div class="container margin-top">
        <h2>{{ task.name }}</h2>
        <p>{{ task.description ? task.description : 'No description was provided' }}</p>
        <div class="margin-top">
            <Comment v-for="comment in getComments" :key="comment.id" :comment="comment"/>
        </div>
        <CreateComment/>
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
                task: ''
            }
        },
        computed: {
            ...mapGetters([
                'getTaskById',
                'getComments'
            ])
        },
        methods: {
            ...mapActions([
                'findAllCommentsByTaskId'
            ])
        },
        created() {
            const taskId = this.$route.params.taskId
            this.task = this.getTaskById(taskId)
            this.findAllCommentsByTaskId(taskId)
        }
    }
</script>

<style scoped>
    .margin-top {
        margin-top: 3%;
    }
</style>
