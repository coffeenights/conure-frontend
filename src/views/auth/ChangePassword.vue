<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Toaster from '@/components/ui/toast/Toaster.vue'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { ref, watch } from 'vue'
import { Loader } from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import { ChangePasswordSchema, changePassword } from '@/services/auth'
import { toTypedSchema } from '@vee-validate/zod'
import axios from 'axios'
import { notify } from '@/services/notifications'

const isLoading = ref(false)
const formError = ref('')
const isDisabled = ref(false)

const { handleSubmit, resetForm, errorBag } = useForm({
  validationSchema: toTypedSchema(ChangePasswordSchema),
})

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true
  formError.value = ''

  try {
    const result = await changePassword(values)
    if (!result.data.error) {
      resetForm()
      notify('Success', 'Password changed successfully.')
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status === 400) {
        formError.value = 'Credentials are incorrect. Please try again.'
      } else {
        formError.value = 'An error occurred. Please try again later.'
      }
    } else {
      formError.value = 'An unexpected error occurred.'
    }
  } finally {
    isLoading.value = false
  }
})

watch(errorBag, () => {
  isDisabled.value = Object.keys(errorBag.value).length > 0
})
</script>

<template>
  <div class="flex flex-col gap-6 pt-4 items-center">
    <div class="h-2">
      <p class="text-red-500">{{ formError }}</p>
    </div>
    <div class="gap-1 w-72">
      <form class="flex flex-col gap-4" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="oldPassword">
          <FormItem>
            <FormLabel>Old Password</FormLabel>
            <FormControl>
              <Input
                placeholder="Old password"
                type="password"
                auto-capitalize="none"
                :disabled="isLoading"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="password">
          <FormItem>
            <FormLabel>New Password</FormLabel>
            <FormControl>
              <Input
                placeholder="New password"
                type="password"
                auto-capitalize="none"
                :disabled="isLoading"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="password2">
          <FormItem>
            <FormLabel>Confirm Password</FormLabel>
            <FormControl>
              <Input
                placeholder="Confirm password"
                type="password"
                auto-capitalize="none"
                :disabled="isLoading"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <Button :disabled="isLoading || isDisabled" type="submit">
          <Loader v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
          Change Password
        </Button>
      </form>
    </div>
  </div>
  <Toaster />
</template>
