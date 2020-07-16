<template>
    <form @submit="onSubmit">
        <div class="form-group margin-top">
            <label for="commentContent"/>
            <textarea rows="3" v-model="content" class="form-control" placeholder="Content" id="commentContent"/>
        </div>
        <button class="btn btn-primary" type="submit">Post Comment</button>
    </form>
</template>

<script>
    import {mapActions} from 'vuex'

    export default {
        name: 'TaskCreateComment',
        data() {
            return {
                content: ''
            }
        },
        methods: {
            ...mapActions(['saveComment']),

            onSubmit(e) {
                e.preventDefault()

                this.saveComment({
                    content: this.content,
                    task: {
                        id: this.$route.params.taskId
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .margin-top {
        margin-top: 3%;
    }
</style>
