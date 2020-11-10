<template>
    <div>
        <h1>Todo list</h1>

        <div class="row">
            <div class="col-sm-6">
                <form @submit.prevent="addTask" class="mb-4">
                    <div class="form-group">
                        <label for="title">Title</label>
                        <input v-model="task.title" type="text" class="form-control" id="title">
                    </div>

                    <div class="form-group">
                        <label for="description">Description</label>
                        <textarea v-model="task.description" class="form-control" id="description" rows="3"></textarea>
                    </div>

                    <button type="submit" class="btn btn-primary">Add Task</button>
                </form>
            </div>
        </div>

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
                    <button @click="editTask(task)" class="btn btn-success">
                        <i class="fa fa-pencil"></i>
                    </button>
                    <button @click="deleteTask(task.id)" class="btn btn-danger">
                        <i class="fa fa-trash"></i>
                    </button>
                </td>
            </tr>
            </tbody>
        </table>

        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li :class="{ disabled: !pagination.prev_page_url }"
                    @click.prevent="getTasks(pagination.prev_page_url)"
                    class="page-item">
                    <a class="page-link" href="#">Previous</a>
                </li>
                <li class="page-item disabled">
                    <a class="page-link" href="#">
                        Page {{ pagination.current_page }} of {{ pagination.last_page }}
                    </a>
                </li>
                <li :class="{ disabled: !pagination.next_page_url }"
                    @click.prevent="getTasks(pagination.next_page_url)"
                    class="page-item">
                    <a class="page-link" href="#">Next</a>
                </li>
            </ul>
        </nav>

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
        getTasks(page_url) {
            page_url = page_url || '/api/tasks'

            axios
                .get(page_url)
                .then(response => {
                    this.tasks = response.data.data
                    this.makePagination(response.data)
                })
                .catch(error => {
                    console.log(error)
                    this.errored = true
                })
                .finally(() => this.loading = false)
        },
        makePagination(response){
            let pagination = {
                current_page: response.current_page,
                last_page: response.last_page,
                prev_page_url: response.prev_page_url,
                next_page_url: response.next_page_url
            }
            this.pagination = pagination
            console.log(this.pagination)
        },
        deleteTask(id){
            axios
                .delete(`/api/tasks/${id}`)
                .then(response => console.log(response))
                .catch(error => console.log(error))
        },
        addTask(){
            if (this.edit === false){
                axios
                    .post('/api/tasks', {
                        title: this.task.title,
                        description: this.task.description
                    })
                    .then(response => {
                        this.title = ''
                        this.description = ''
                        this.getTasks()
                        console.log(response)
                    })
                    .catch(error => console.log(error))
            } else {
                axios
                    .put(`/api/tasks/${this.task.id}`, {
                        title: this.task.title,
                        description: this.task.description
                    })
                    .then(response => {
                        this.title = ''
                        this.description = ''
                        this.getTasks()
                        console.log(response)
                    })
                    .catch(error => console.log(error))
            }
        },
        editTask(task){
            this.edit = true
            this.task.id = task.id
            this.task.title = task.title
            this.task.description = task.description
        }
    }
}
</script>
