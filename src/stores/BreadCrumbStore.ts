import { defineStore } from "pinia";
import { list } from "postcss";
import { ref } from 'vue';


export const useBreadCrumbStore = defineStore('BreadCrumbStore', () => {
    const environment = ref('')
    // TODO: start with some default values for testing
    const applicationId = ref('')
    const application = ref('')
    const organizationId = ref('')
    const organization = ref('ConureTest')

    // appId 65c084eaff5e41522cc80f99
    // orgId 6599082303bedbfeb7243ada

    function updateBreadcrumbState(appId: string, orgId: string, env: string) {
        
        applicationId.value = appId
        organizationId.value = orgId
        environment.value = env
    }
    

    return { 
        environment, 
        application,
        applicationId, 
        organization,
        organizationId
    }
})