<template>
    <div class="comment-wrapper">
        {{ comment.content }}
    </div>
</template>

<script>
    export default {
        name: 'TaskComment',
        props: ['comment']
    }
</script>

<style scoped>
    .comment-wrapper {
        margin: 10px;
        padding: 10px;
        box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.2);
    }
</style>
