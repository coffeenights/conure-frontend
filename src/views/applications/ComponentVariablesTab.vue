<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import {
  createVariable,
  deleteVariable,
  listComponentVariables,
  Variable,
  VariableSchema,
} from '@/services/variables'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { Loader } from 'lucide-vue-next'
import { useBreadCrumbStore } from '@/stores/BreadCrumbStore'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import axios from 'axios'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { notify } from '@/services/notifications'
import { registerError } from '@/services/errors'

const route = useRoute()
const variables = ref([] as Variable[])
const store = useBreadCrumbStore()
const newVariableOpen = ref(false)
const deleteDialog = ref(false)
const toDeleteVariable = ref({} as Variable)
const isLoading = ref(false)
const variableRead = ref(false)
const selectedVariable = ref({} as Variable)

watch(() => route.params.id, fetchVariables, { immediate: true })

function fetchVariables() {
  isLoading.value = true
  listComponentVariables(
    store.organizationId,
    store.applicationId,
    store.environment,
    route.params.componentId as string,
  )
    .then((response) => {
      variables.value = response.data
    })
    .catch((error) => {
      throw error
    })
    .finally(() => {
      isLoading.value = false
    })
}
const { handleSubmit, isSubmitting } = useForm({
  validationSchema: toTypedSchema(VariableSchema),
  initialValues: {
    isEncrypted: false,
  },
})

const onSubmit = handleSubmit(async (values) => {
  try {
    const result = await createVariable({
      name: values.name,
      value: values.value,
      type: 'component',
      organization_id: store.organizationId,
      application_id: store.applicationId,
      environment_id: store.environment,
      component_id: route.params.componentId as string,
      is_encrypted: values.isEncrypted,
    })
    if (result.status == 201) {
      notify('Success', 'New variable created!')
      newVariableOpen.value = false
    }
    fetchVariables()
  } catch (error) {
    if (!axios.isAxiosError(error)) {
      registerError('An error occurred', 'An unexpected error occurred.', error)
    }
  }
})

const deleteDialogueOpen = (variable: Variable) => {
  toDeleteVariable.value = variable
  deleteDialog.value = true
}

const onDelete = async (id: string) => {
  try {
    await deleteVariable(store.organizationId, id)
    // refresh the list of variables
    fetchVariables()
    notify('Success', 'Variable deleted!')
  } catch (error) {
    if (!axios.isAxiosError(error)) {
      registerError('An error occurred', 'An unexpected error occurred.', error)
    }
  }
}

const selectVariable = (variable: Variable) => {
  selectedVariable.value = variable
  variableRead.value = true
}

const truncate = (text: string, length: number) => {
  return text.length > length ? text.substring(0, length) + ' ...' : text
}
</script>

<template>
  <div class="flex flex-row gap-2 flex-wrap border rounded-md p-2">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Scope</TableHead>
          <TableHead>Value</TableHead>
          <TableHead class="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody v-if="!isLoading" class="[&_tr:last-child]:border-1">
        <TableRow
          v-for="variable in variables"
          :key="variable.id"
          class="cursor-pointer"
        >
          <TableCell
            class="font-medium flex items-center"
            @click="selectVariable(variable)"
          >
            <span
              v-if="variable.is_encrypted"
              class="bi-key text-xl mr-3"
            ></span>
            {{ variable.name }}
          </TableCell>
          <TableCell @click="selectVariable(variable)">
            <Badge variant="secondary">
              {{ variable.type }}
            </Badge>
          </TableCell>
          <TableCell @click="selectVariable(variable)">
            <span v-if="variable.is_encrypted">**************</span>
            <span v-else>{{ truncate(variable.value, 100) }}</span>
          </TableCell>
          <TableCell class="text-right">
            <span
              class="bi-trash text-xl cursor-pointer hover:text-red-700"
              @click="deleteDialogueOpen(variable)"
            ></span>
          </TableCell>
        </TableRow>
      </TableBody>
      <TableBody v-if="isLoading" class="border-1">
        <TableRow v-for="i in 3" :key="i">
          <TableCell class="text-center">
            <Skeleton class="h-4 w-48" />
          </TableCell>
          <TableCell class="text-center">
            <Skeleton class="h-4 w-24" />
          </TableCell>
          <TableCell class="text-center">
            <Skeleton class="h-4 w-48" />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
    <div
      v-if="!variables.length && !isLoading"
      class="flex flex-col items-center w-full"
    >
      <h1 class="text-lg text-muted-foreground mt-5">
        No component variables found
      </h1>
    </div>
    <div class="px-2 pb-2">
      <Dialog v-model:open="newVariableOpen">
        <DialogTrigger as-child>
          <Button variant="outline" size="icon">
            <span class="bi-plus-lg text-xl"></span>
          </Button>
        </DialogTrigger>
        <DialogContent class="sm:max-w-md">
          <form class="space-y-6" @submit="onSubmit">
            <DialogHeader>
              <DialogTitle>Add new variable</DialogTitle>
              <DialogDescription class="hidden">
                Create a new component variable
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
            <FormField v-slot="{ componentField }" name="value">
              <FormItem>
                <FormLabel>Value</FormLabel>
                <FormControl>
                  <Textarea
                    type="text"
                    v-bind="componentField"
                    :disabled="isSubmitting"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ value, handleChange }" name="isEncrypted">
              <FormItem>
                <FormControl>
                  <div class="flex items-center space-x-2">
                    <Switch
                      id="isEncrypted"
                      :checked="value"
                      @update:checked="handleChange"
                    />
                    <Label for="isEncrypted">Encrypted</Label>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <DialogFooter class="sm:justify-end mt-2">
              <DialogClose>
                <Button
                  variant="outline"
                  :disabled="isSubmitting"
                  class="w-full"
                  type="button"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                :disabled="isSubmitting"
                class="mb-4 sm:mb-0"
              >
                <Loader v-if="isSubmitting" class="mr-2 h-4 w-4 animate-spin" />
                Save
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog v-model:open="variableRead">
        <DialogContent class="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Variable</DialogTitle>
          </DialogHeader>
          <FormField name="name">
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  v-model="selectedVariable.name"
                  type="text"
                  :disabled="true"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField name="value">
            <FormItem>
              <FormLabel>Value</FormLabel>
              <FormControl>
                <Textarea
                  v-model="selectedVariable.value"
                  type="text"
                  :disabled="true"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField name="isEncrypted">
            <FormItem>
              <FormControl>
                <div class="flex items-center space-x-2">
                  <Switch
                    id="isEncrypted"
                    :checked="selectedVariable.is_encrypted"
                    :disabled="true"
                  />
                  <Label for="isEncrypted">Encrypted</Label>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <DialogFooter class="sm:justify-end mt-2">
            <DialogClose>
              <Button variant="outline" class="w-full" type="button">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog v-model:open="deleteDialog">
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              Do you want to delete the variable named "{{
                toDeleteVariable.name
              }}"?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction @click="onDelete(toDeleteVariable.id)">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  </div>
</template>
