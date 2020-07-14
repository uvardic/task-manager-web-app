<template>
    <div class="task-card" :id="task.id">
        {{task.name}}
    </div>
</template>

<script>
    export default {
        name: 'ProjectTask',
        props: ['task']
    }
</script>

<style scoped>
    .task-card {
        margin: 10px;
        padding: 10px;
        box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.2);
    }
</style>
