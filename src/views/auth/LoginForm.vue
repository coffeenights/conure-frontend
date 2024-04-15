<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { onMounted, ref, watch } from 'vue'
import { Loader } from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import { UserLoginSchema, authenticateUser } from '@/services/auth'
import { toTypedSchema } from '@vee-validate/zod'
import axios from 'axios'
import CompanyLogo from '@/components/CompanyLogo.vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/UserStore'

const isLoading = ref(false)
const authError = ref('')
const router = useRouter()
const userStore = useUserStore()

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(UserLoginSchema),
})

watch(
  () => userStore.authenticated,
  (newVal) => {
    if (newVal) {
      if ('next' in router.currentRoute.value.query) {
        router.push(router.currentRoute.value.query.next as string)
        return
      }
      router.replace({ path: '/' })
    }
  }
)

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true
  authError.value = ''

  try {
    const result = await authenticateUser(values)
    if (!result.isError) {
      userStore.authenticated = true
      if ('next' in router.currentRoute.value.query) {
        router.push(router.currentRoute.value.query.next as string)
        return
      }
      router.replace({ path: '/' })
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status === 401) {
        authError.value = 'Credentials are incorrect. Please try again.'
      } else {
        authError.value = 'An error occurred. Please try again later.'
      }
    } else {
      authError.value = 'An unexpected error occurred.'
    }
  } finally {
    isLoading.value = false
  }
})

// onMounted(() => {
//   if (userStore.authenticated) {
//     if ('next' in router.currentRoute.value.query) {
//       router.push(router.currentRoute.value.query.next as string)
//       return
//     }
//     router.replace({ path: '/' })
//   }
// })
</script>

<template>
  <div class="flex flex-col w-1/2 gap-6 pt-4 items-center">
    <div class="w-1/6">
      <CompanyLogo />
    </div>
    <div class="h-2">
      <p class="text-red-500">{{ authError }}</p>
    </div>
    <div>
      <form @submit="onSubmit">
        <div class="grid gap-2">
          <div class="grid gap-1">
            <FormField v-slot="{ componentField }" name="email">
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    placeholder="name@example.com"
                    type="email"
                    auto-capitalize="none"
                    auto-complete="email"
                    auto-correct="off"
                    :disabled="isLoading"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="password">
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    id="password"
                    placeholder="password"
                    type="password"
                    auto-capitalize="none"
                    :disabled="isLoading"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>
          <Button :disabled="isLoading" type="submit">
            <Loader v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
            Sign In
          </Button>
        </div>
      </form>
    </div>
  </div>
</template>
