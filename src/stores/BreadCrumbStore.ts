import { defineStore } from "pinia";
import { ref } from 'vue';


export const useBreadCrumbStore = defineStore('BreadCrumbStore', () => {
    const environment = ref('default')
    const application = ref('')
    const organization = ref('')
    return { environment, application, organization }
})