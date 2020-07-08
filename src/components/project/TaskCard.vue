<template>
    <div>
        <div class="task-wrapper">
            {{task}}
        </div>
    </div>
</template>

<script>
    export default {
        name: 'TaskCard',
        props: ['task']
    }
</script>

<style scoped>
    .task-wrapper {
        display: inline-block;
        text-align: left;
        width: 100%;
        margin: 5px;
        padding: 5px;
        box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.2);
        /*border-radius: 5px;*/
    }
</style>
