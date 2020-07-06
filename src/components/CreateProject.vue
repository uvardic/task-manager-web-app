<template>
    <div>
        <form @submit="onSubmit">
            <input type="text" v-model="name" placeholder="Create Project">
            <input type="submit" value="Create">
        </form>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'

    export default {
        name: 'CreateProject',
        data() {
            return {
                name: ''
            }
        },
        methods: {
            ...mapActions(['createProject']),
            onSubmit(e) {
                e.preventDefault()
                this.createProject(this.name)
            }
        }
    }
</script>

<style scoped>
    form {
        display: flex;
    }

    input[type="text"] {
        flex: 10;
        padding: 10px;
        border: 1px solid #333;
        outline: 0;
    }

    input[type="submit"] {
        flex: 2;
        background: #333;
        color: #fff;
        border: 1px solid #333;
        cursor: pointer;
    }
</style>
