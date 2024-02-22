import { defineStore } from "pinia";
import { list } from "postcss";
import { ref } from 'vue';


export const useBreadCrumbStore = defineStore('BreadCrumbStore', () => {
    const environment = ref('')
    const applicationId = ref('')
    const application = ref('')
    const organizationId = ref('')
    const organization = ref('')

    return { 
        environment, 
        application,
        applicationId, 
        organization,
        organizationId
    }
})