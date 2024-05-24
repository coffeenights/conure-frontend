<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Status } from '@/components/ui/status'
import { ref, watch } from 'vue'
import {
  createOrganization,
  getTimeAgo,
  listOrganizations,
  Organization,
  OrganizationSchema,
} from '@/services/organizations'
import { useBreadCrumbStore } from '@/stores/BreadCrumbStore'
import { SetSettings, Settings } from '@/storage/settings'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Loader } from 'lucide-vue-next'
import axios from 'axios'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { registerError } from '@/services/errors'
import { notify } from '@/services/notifications'

const store = useBreadCrumbStore()
const getFirstLetter = (name: string): string => {
  return name.charAt(0).toUpperCase()
}
const route = useRoute()
const router = useRouter()
const organizations = ref([] as Organization[])
const newOrganizationOpen = ref(false)

const goToApplications = (organization: Organization) => {
  store.organizationId = organization.id
  store.organization = organization.name
  router.push({
    name: 'applications',
    params: { organizationId: organization.id },
  })
  SetSettings({ defaultOrganization: organization.id } as Settings)
}

const fetchData = () => {
  listOrganizations()
    .then((response) => {
      organizations.value = response.data.organizations
    })
    .catch((error) => {
      registerError(error)
      throw error
    })
}
watch(() => route.params.organizationId, fetchData, { immediate: true })

const selectBackgroundColor = (letter: string) => {
  const colors = [
    'bg-red-500',
    'bg-yellow-500',
    'bg-orange-500',
    'bg-blue-500',
    'bg-indigo-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-red-600',
    'bg-yellow-600',
    'bg-green-600',
    'bg-blue-600',
    'bg-indigo-600',
    'bg-purple-600',
    'bg-pink-600',
    'bg-red-700',
    'bg-yellow-700',
    'bg-green-700',
    'bg-blue-700',
    'bg-indigo-700',
    'bg-purple-700',
    'bg-pink-700',
    'bg-red-800',
    'bg-yellow-800',
    'bg-green-800',
    'bg-blue-800',
    'bg-indigo-800',
  ]
  const lowLetter = letter.toLowerCase()
  return colors[lowLetter.charCodeAt(0) - 'a'.charCodeAt(0)]
}

store.organizationId = ''
store.organization = ''

const onAddOrganization = () => {
  newOrganizationOpen.value = true
}

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: toTypedSchema(OrganizationSchema),
})

const onSubmit = handleSubmit(async (values) => {
  try {
    const result = await createOrganization({
      name: values.name,
    })
    if (result.status == 201) {
      notify('Success', 'New organization created!')
      newOrganizationOpen.value = false
    }
    fetchData()
  } catch (error) {
    if (!axios.isAxiosError(error)) {
      registerError(error, {
        title: 'An error occurred',
        description: 'An unexpected error occurred.',
      })
    }
  }
})
</script>
<template>
  <div class="content-wrapper">
    <div class="flex flex-row flex-wrap gap-5 p-5 justify-center">
      <Card
        v-for="o in organizations"
        :key="o.id"
        class="overflow-hidden w-60 cursor-pointer"
        @click="goToApplications(o)"
      >
        <CardHeader :class="selectBackgroundColor(getFirstLetter(o.name))">
          <div class="text-4xl font-bold text-center text-white">
            {{ getFirstLetter(o.name) }}
          </div>
        </CardHeader>
        <CardContent class="p-3">
          <div class="font-bold text-lg">{{ o.name }}</div>
          <div class="text-xs text-muted-foreground pb-2">
            Created {{ getTimeAgo(o.created_at) }} ago
          </div>
          <Status
            :status="o.status"
            :text="o.status"
            class="border-t mt-3 pt-3 justify-center"
          ></Status>
        </CardContent>
      </Card>
      <Card
        class="flex flex-col justify-center items-center w-60 cursor-pointer"
        @click="onAddOrganization"
      >
        <CardContent class="p-0">
          <span class="text-9xl font-bold text-gray-400 bi bi-plus"></span>
        </CardContent>
      </Card>
    </div>
  </div>
  <Dialog v-model:open="newOrganizationOpen">
    <DialogContent class="sm:max-w-md">
      <form class="space-y-6" @submit="onSubmit">
        <DialogHeader>
          <DialogTitle>Add new organization</DialogTitle>
          <DialogDescription class="hidden">
            Create a new organization
          </DialogDescription>
        </DialogHeader>
        <FormField v-slot="{ componentField }" name="name">
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input
                type="text"
                v-bind="componentField"
                :disabled="isSubmitting"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <DialogFooter class="sm:justify-end mt-2">
          <DialogClose>
            <Button
              type="button"
              variant="outline"
              :disabled="isSubmitting"
              class="w-full"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" :disabled="isSubmitting" class="mb-4 sm:mb-0">
            <Loader v-if="isSubmitting" class="mr-2 h-4 w-4 animate-spin" />
            Save
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
