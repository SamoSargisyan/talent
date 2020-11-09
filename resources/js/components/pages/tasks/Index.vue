<template>
    <div>
        <h1>Todo list</h1>
        <div v-if="errored" class="alert alert-danger" role="alert">
            Oops.. something is wrong!
        </div>
        <table v-else class="table table-striped">
            <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col"></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="task in tasks" :key="task.id">
                <th>{{ task.id }}</th>
                <td>{{ task.title }}</td>
                <td>{{ task.description }}</td>
                <td>
                    <button class="btn btn-success">Update</button>
                    <button class="btn btn-danger">Delete</button>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    data(){
        return {
            tasks: [],
            task: {
                id: '',
                title: '',
                description: ''
            },
            post_id: '',
            pagination: {},
            edit: false,
            loading: true,
            errored: false
        }
    },
    mounted() {
        this.getTasks()
    },
    methods: {
        getTasks() {
            axios
                .get('/api/tasks')
                .then(response => {
                    this.tasks = response.data.data
                })
                .catch(error => {
                    console.log(error)
                    this.errored = true
                })
                .finally(() => this.loading = false)
        }
    }
}
</script>
