import { defineStore } from "pinia";
import { ref } from 'vue';


export const useBreadCrumbStore = defineStore('BreadCrumbStore', () => {
    const environment = ref('')
    // TODO: start with some default values for testing
    const applicationId = ref('65c084eaff5e41522cc80f99')
    const application = ref('first-app')
    const organizationId = ref('6599082303bedbfeb7243ada')
    const organization = ref('ConureTest')
    return { 
        environment, 
        application,
        applicationId, 
        organization,
        organizationId
    }
})