<script setup lang="ts">
import { ref, watch } from 'vue'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'

import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { configure, FieldArray } from 'vee-validate'
import { z } from 'zod'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from '@/components/ui/number-field'
import { Component, detailsComponent } from '@/services/organizations'
import { registerError } from '@/services/errors'
import { useBreadCrumbStore } from '@/stores/BreadCrumbStore'
import { useRoute } from 'vue-router'
import SettingsErrorMessage from '@/components/SettingsErrorMessage.vue'

const generalIsOpen = ref(true)
const resourcesIsOpen = ref(true)
const sourceIsOpen = ref(true)
const networkIsOpen = ref(true)
const storageIsOpen = ref(false)
const component = ref({
  name: '',
  type: '',
  description: '',
  application_id: '',
  settings: {
    resources_settings: {
      replicas: [1],
      cpu: [1.0],
      memory: [512],
    },
    network_settings: {
      exposed: false,
      type: 'public',
      ports: [{ host_port: null, target_port: null, port_protocol: 'TCP' }],
    },
    storage_settings: [{ name: null, mountPath: null, size: 0.1 }],
    source_settings: {
      repository: '',
      command: '',
    },
  },
} as Component)

const isLoading = ref(true)
const breadCrumbStore = useBreadCrumbStore()
const route = useRoute()

const fetchData = () => {
  isLoading.value = true
  detailsComponent(
    breadCrumbStore.organizationId,
    breadCrumbStore.applicationId,
    breadCrumbStore.environment,
    route.params.componentId as string,
  )
    .then((response) => {
      let settingsData = response.data
      settingsData.settings.resources_settings.replicas = [
        response.data.settings.resources_settings.replicas,
      ]
      settingsData.settings.resources_settings.cpu = [
        response.data.settings.resources_settings.cpu,
      ]
      settingsData.settings.resources_settings.memory = [
        response.data.settings.resources_settings.memory,
      ]
      component.value = settingsData
    })
    .catch((error) => {
      registerError(error)
      throw error
    })
    .finally(() => {
      isLoading.value = false
    })
}
watch(() => route.params.componentId, fetchData, { immediate: true })

configure({
  validateOnBlur: false,
  validateOnChange: true,
  validateOnInput: false,
  validateOnModelUpdate: false,
})

type PortError = {
  hostPort: string
  targetPort: string
  portProtocol: string
}

type Port = {
  hostPort: number
  targetPort: number
  portProtocol: 'TCP' | 'UDP'
}

type Network = {
  networkExpose: boolean
  networkType: 'private' | 'public'
  networkPorts: Port[]
}

type Storage = {
  name: string
  mountPath: string
  size: number
}

type StorageErrors = {
  name: string
  mountPath: string
  size: string
}

const networkSchema = z.object({
  networkExpose: z.boolean(),
  networkType: z.enum(['private', 'public']),
  networkPorts: z.array(
    z.object({
      hostPort: z.number().min(0).max(65535),
      targetPort: z.number().min(0).max(65535),
      portProtocol: z.enum(['TCP', 'UDP']),
    }),
  ),
})

const storageSchema = z.array(
  z.object({
    name: z.string().max(50),
    mountPath: z.string().max(100),
    size: z.number().min(0.1).max(100.0),
  }),
)

const networkPortErrors = ref<PortError[]>([])
const storageErrors = ref<StorageErrors[]>([])

const schemaSettings = {
  name: toTypedSchema(z.string().max(50)),
  description: toTypedSchema(z.string().max(255).optional()),
  resourcesCpu: toTypedSchema(z.array(z.number().min(0.1).max(4.0))),
  resourcesMemory: toTypedSchema(z.array(z.number().min(128).max(4096))),
  resourcesReplicas: toTypedSchema(z.array(z.number().min(0).max(60))),
  sourceImage: toTypedSchema(z.string().max(255)),
  sourceCommand: toTypedSchema(z.string().max(255).optional()),
  network: (values: Network) => {
    if (values && typeof values.networkExpose === 'undefined') {
      return true
    } else if (!values.networkExpose) {
      return true
    } else if (isSubmitting.value) {
      const validationResult = networkSchema.safeParse(values)
      if (!validationResult.success) {
        networkPortErrors.value = Array.from(
          { length: values.networkPorts.length },
          () => ({
            hostPort: '',
            targetPort: '',
            portProtocol: '',
          }),
        )
        for (const error of validationResult.error?.errors) {
          networkPortErrors.value[error.path[1]][error.path[2]] = error.message
        }
      }
      return validationResult.success
    }
  },
  storage: (values: Storage) => {
    if (!storageIsOpen.value) {
      return true
    }
    if (isSubmitting.value) {
      const validationResult = storageSchema.safeParse(values)
      if (!validationResult.success) {
        storageErrors.value = Array.from({ length: values.length }, () => ({
          name: '',
          mountPath: '',
          size: '',
        }))
        for (const error of validationResult.error?.errors) {
          storageErrors.value[error.path[0]][error.path[1]] = error.message
        }
      }
      return validationResult.success
    }
  },
}

const { handleSubmit, isSubmitting, setFieldValue } = useForm({
  validationSchema: schemaSettings,
  initialValues: {
    resourcesCpu: [1.0],
    resourcesMemory: [512],
    resourcesReplicas: [1],
    network: {
      networkExpose: false,
      networkType: 'public',
      networkPorts: [{ hostPort: null, targetPort: null, portProtocol: 'TCP' }],
    },
    storage: [{ name: null, mountPath: null, size: 0.1 }],
  },
})

const handleAccordionTrigger = (newValue) => {
  generalIsOpen.value = newValue.includes('general')
  resourcesIsOpen.value = newValue.includes('resources')
  sourceIsOpen.value = newValue.includes('source')
  networkIsOpen.value = newValue.includes('network')
  storageIsOpen.value = newValue.includes('storage')
}

const onSubmit = handleSubmit(async (values) => {
  console.log(values)
})
</script>

<template>
  <Accordion
    type="multiple"
    :default-value="['general', 'resources', 'source', 'network']"
    collapsible
    @update:model-value="handleAccordionTrigger"
  >
    <AccordionItem value="general" class="border border-b-0 rounded-t-md">
      <AccordionTrigger class="px-4 bg-transparent">General</AccordionTrigger>
      <AccordionContent
        class="p-5 bg-background flex flex-col gap-5 flex-wrap"
        force-mount
        :is-open="generalIsOpen"
      >
        <div class="space-y-2">
          <Label>Name</Label>
          <Input
            v-model="component.name"
            type="text"
            placeholder="Component's name"
            class="bg-card"
            name="name"
          />
          <SettingsErrorMessage />
        </div>
        <div class="space-y-2">
          <Label>Description (optional)</Label>
          <Textarea
            v-model="component.description"
            type="text"
            placeholder="Describe your component here..."
            class="bg-card"
            name="description"
          />
          <SettingsErrorMessage />
        </div>
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="resources" class="border border-b-0">
      <AccordionTrigger class="px-4 bg-transparent">Resources</AccordionTrigger>
      <AccordionContent
        class="p-5 bg-background flex flex-row gap-5"
        force-mount
        :is-open="resourcesIsOpen"
      >
        <div class="grow w-full space-y-2">
          <Label>Replicas</Label>
          <Slider
            v-bind="componentField"
            v-model="component.settings.resources_settings.replicas"
            :default-value="[1]"
            :max="60"
            :min="0"
            :step="1"
            slider-class="bg-card"
            name="resourcesReplicas"
          />
          <div class="flex justify-between text-sm text-muted-foreground">
            <span>{{ component.settings.resources_settings.replicas[0] }}</span>
          </div>
          <SettingsErrorMessage />
        </div>
        <div class="grow w-full space-y-2">
          <Label>CPU</Label>
          <Slider
            v-bind="componentField"
            v-model="component.settings.resources_settings.cpu"
            :default-value="[1.0]"
            :max="4.0"
            :min="0.1"
            :step="0.1"
            slider-class="bg-card"
            name="resourcesCpu"
          />
          <div class="flex justify-between text-sm text-muted-foreground">
            <span>{{ component.settings.resources_settings.cpu[0] }}</span>
          </div>
          <SettingsErrorMessage />
        </div>
        <div class="grow w-full space-y-2">
          <Label>Memory</Label>
          <Slider
            v-bind="componentField"
            v-model="component.settings.resources_settings.memory"
            :default-value="[512]"
            :max="4096"
            :min="128"
            :step="128"
            slider-class="bg-card"
            name="resourcesMemory"
          />
          <div class="flex justify-between text-sm text-muted-foreground">
            <span
              >{{ component.settings.resources_settings.memory[0] }} Mb</span
            >
          </div>
          <SettingsErrorMessage />
        </div>
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="source" class="border border-b-0">
      <AccordionTrigger class="px-4 bg-transparent">Source</AccordionTrigger>
      <AccordionContent
        class="p-5 bg-background flex flex-col gap-5 flex-wrap"
        force-mount
        :is-open="sourceIsOpen"
      >
        <div class="space-y-2">
          <Label>Image</Label>
          <Input
            v-model="component.settings.source_settings.repository"
            type="text"
            placeholder="registry/repository:tag"
            class="bg-card"
            name="sourceImage"
          />
          <div class="text-sm text-muted-foreground">
            The Image field is where you specify the container image for your
            component
          </div>
          <SettingsErrorMessage />
        </div>
        <div class="space-y-2">
          <Label>Command (optional)</Label>
          <Input
            v-model="component.settings.source_settings.command"
            type="text"
            placeholder="yarn dev"
            class="bg-card"
            name="sourceCommand"
          />
          <div class="text-sm text-muted-foreground">
            Override the CMD property of your container image
          </div>
          <SettingsErrorMessage />
        </div>
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="network" class="border border-b-0">
      <AccordionTrigger class="px-4 bg-transparent">Network</AccordionTrigger>
      <AccordionContent
        class="p-5 bg-background flex flex-col gap-5 flex-wrap"
        force-mount
        :is-open="networkIsOpen"
      >
        <div class="flex flex-col space-y-2">
          <Label>Expose the component</Label>
          <Switch
            v-model="component.settings.network_settings.exposed"
            :checked="component.settings.network_settings.exposed"
            name="network.networkExpose"
          />
          <div class="text-sm text-muted-foreground">
            Activate if you want to expose the component to other components in
            the application or to the outside world
          </div>
          <SettingsErrorMessage />
        </div>

        <div class="space-y-2">
          <Label>Type</Label>
          <Select
            v-model="component.settings.network_settings.type"
            default-value="public"
            name="network.networkType"
          >
            <SelectTrigger class="bg-card">
              <SelectValue placeholder="Select a network type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="private"> Private </SelectItem>
                <SelectItem value="public"> Public </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <div class="text-sm text-muted-foreground">
            Select to whom you want to expose the component
          </div>
          <SettingsErrorMessage />
        </div>
        <div class="space-y-2">
          <Label>Ports</Label>
          <fieldset
            v-for="(port, idx) in component.settings.network_settings.ports"
            :key="port"
            class="flex flex-row gap-2 items-center"
          >
            <div class="grow space-y-2">
              <Input
                type="number"
                placeholder="Host"
                class="bg-card"
                v-model="port.host_port"
              />
              <p
                v-if="networkPortErrors[idx]"
                class="text-sm font-medium text-destructive"
              >
                {{ networkPortErrors[idx].hostPort }}
              </p>
            </div>
            <span class="space-x-2">:</span>
            <div class="grow space-y-2">
              <Input
                v-model="port.target_port"
                type="number"
                placeholder="Target"
                class="bg-card"
              />
              <p
                v-if="networkPortErrors[idx]"
                class="text-sm font-medium text-destructive"
              >
                {{ networkPortErrors[idx].targetPort }}
              </p>
            </div>
            <div class="w-24 space-y-2">
              <Select v-model="port.protocol" default-value="TCP">
                <SelectTrigger class="bg-card">
                  <SelectValue placeholder="Select a protocol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="TCP"> TCP </SelectItem>
                    <SelectItem value="UDP"> UDP </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <p
                v-if="networkPortErrors[idx]"
                class="text-sm font-medium text-destructive"
              >
                {{ networkPortErrors[idx].portProtocol }}
              </p>
            </div>
            <Button size="icon" variant="ghost" @click="remove(idx)">
              <span class="bi-trash text-xl cursor-pointer"></span>
            </Button>
          </fieldset>
          <Button
            size="sm"
            variant="secondary"
            @click="
              push({
                hostPort: null,
                targetPort: null,
                portProtocol: 'TCP',
              })
            "
          >
            <span class="bi-plus text-xl cursor-pointer"></span>
          </Button>
        </div>
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="storage" class="border rounded-b-md">
      <AccordionTrigger class="px-4 bg-transparent">Storage</AccordionTrigger>
      <AccordionContent
        class="p-5 bg-background flex flex-col gap-5 flex-wrap"
        force-mount
        :is-open="storageIsOpen"
      >
        <FieldArray v-slot="{ fields, push, remove }" name="storage">
          <fieldset
            v-for="(field, idx) in fields"
            :key="field.key"
            class="flex flex-row gap-2 items-center"
          >
            <FormField
              v-slot="{ componentField }"
              :name="`storage[${idx}].name`"
            >
              <FormItem class="grow">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Volume name"
                    v-bind="componentField"
                    class="bg-card"
                  />
                </FormControl>
                <FormDescription>
                  Indicate a name to identify the volume
                </FormDescription>
                <p
                  v-if="storageErrors[idx]"
                  class="text-sm font-medium text-destructive"
                >
                  {{ storageErrors[idx].name }}
                </p>
              </FormItem>
            </FormField>
            <FormField
              v-slot="{ componentField }"
              :name="`storage[${idx}].mountPath`"
            >
              <FormItem class="grow">
                <FormLabel>Mount Path</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="/path/to/mount"
                    v-bind="componentField"
                    class="bg-card"
                  />
                </FormControl>
                <FormDescription>
                  Where inside the component will the volume be mounted
                </FormDescription>
                <p
                  v-if="storageErrors[idx]"
                  class="text-sm font-medium text-destructive"
                >
                  {{ storageErrors[idx].mountPath }}
                </p>
              </FormItem>
            </FormField>
            <FormField
              v-slot="{ componentField }"
              :name="`storage[${idx}].size`"
            >
              <FormItem class="grow">
                <FormLabel>Size</FormLabel>
                <NumberField
                  :min="0.1"
                  :max="100"
                  :step="0.1"
                  :default-value="0.1"
                  @update:model-value="
                    (v) => {
                      if (v) {
                        setFieldValue(`storage[${idx}].size`, v)
                      } else {
                        setFieldValue(`storage[${idx}].size`, undefined)
                      }
                    }
                  "
                >
                  <NumberFieldContent>
                    <NumberFieldDecrement />
                    <FormControl>
                      <NumberFieldInput
                        class="bg-card"
                        v-bind="componentField"
                      />
                    </FormControl>
                    <NumberFieldIncrement />
                  </NumberFieldContent>
                </NumberField>
                <FormDescription>
                  Value indicates the size of the volume in GB
                </FormDescription>
                <p
                  v-if="storageErrors[idx]"
                  class="text-sm font-medium text-destructive"
                >
                  {{ storageErrors[idx].size }}
                </p>
              </FormItem>
            </FormField>
            <Button size="icon" variant="ghost" @click="remove(idx)">
              <span class="bi-trash text-xl cursor-pointer"></span>
            </Button>
          </fieldset>
          <Button
            size="sm"
            variant="secondary"
            class="w-12"
            @click="push({ name: null, mountPath: null, size: 0.1 })"
          >
            <span class="bi-plus text-xl cursor-pointer"></span>
          </Button>
        </FieldArray>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
  <div class="flex w-full my-5">
    <Button :disabled="isSubmitting" class="grow" @click="onSubmit"
      >Save</Button
    >
  </div>
</template>
