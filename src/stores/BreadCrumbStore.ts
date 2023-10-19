import { defineStore } from "pinia";
import { ref } from 'vue';


export const useBreadCrumbStore = defineStore('BreadCrumbStore', () => {
    const environment = ref('default')
    const application = ref('')
    const component = ref('')
    return { environment, application, component }
})