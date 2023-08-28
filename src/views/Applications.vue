<template>
    <div class="row">
        <div class="col">
            <div class="row pt-2">
                <div class="col-10"><input type="search" class="form-control" placeholder="Search"></div>
                <div class="col"><select class="form-select">
                        <optgroup label="Application type">
                            <option value="12" selected="">This is item 1</option>
                            <option value="13">This is item 2</option>
                            <option value="14">This is item 3</option>
                        </optgroup>
                    </select></div>
            </div>
        </div>
        <div class="col-1 d-flex justify-content-end main-content-wrapper">
            <div class="m-2"><button class="btn btn-primary" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-plus-lg fs-5">
                        <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"></path>
                    </svg></button></div>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <div class="row">
                <div class="col-md-6 col-xxl-2 col-xl-3 col-lg-4">
                    <div class="card">
                        <div class="card-body">
                            <h4 class="card-title">Project 1</h4>
                            <p class="card-text">Quick description if exists</p><button class="btn btn-primary" type="button">Details</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

export default {
    setup() {
        const applications = ref({})
        onMounted(() => {
            axios.get('http://localhost:8080')
            .then(response => (applications.value = response))
        }) 
        console.log()
    }
}
</script>