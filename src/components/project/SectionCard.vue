<template>
    <div class="card">
        <div class="card-header">
            <h3>{{section.name}}</h3>
        </div>
        <div class="card-body">
            <ul>
                <li>Task 1</li>
                <li>Task 1</li>
                <li>Task 1</li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'SectionCard',
        props: ['section']
    }
</script>

<style scoped>

</style>
