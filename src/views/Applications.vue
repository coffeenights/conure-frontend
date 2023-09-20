<template>
<div class="content-wrapper">
    
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