<template>
    <div class="project-wrapper">
        <p>{{project.name}}</p>
    </div>
</template>

<script>
    export default {
        name: 'ProjectCard',
        props: ['project']
    }
</script>

<style scoped>
    .project-wrapper {
        margin: 20px;
        padding: 20px;
        box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.2);
        /*border-radius: 5px;*/
    }
</style>
