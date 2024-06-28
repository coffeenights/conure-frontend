<script setup lang="ts">
import { ref } from 'vue'
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

const generalIsOpen = ref(true)
const resourcesIsOpen = ref(true)
const sourceIsOpen = ref(true)
const networkIsOpen = ref(true)
const storageIsOpen = ref(false)

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

// const { push, remove, fields } = useFieldArray('ports')


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

const isRequired = () => {
  return generalIsOpen.value
}
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
        <FormField v-slot="{ componentField }" name="name">
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Component's name"
                v-bind="componentField"
                class="bg-card"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="description">
          <FormItem>
            <FormLabel>Description (optional)</FormLabel>
            <FormControl>
              <Textarea
                type="text"
                placeholder="Describe your component here..."
                v-bind="componentField"
                class="bg-card"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="resources" class="border border-b-0">
      <AccordionTrigger class="px-4 bg-transparent">Resources</AccordionTrigger>
      <AccordionContent
        class="p-5 bg-background flex flex-row gap-5"
        force-mount
        :is-open="resourcesIsOpen"
      >
        <FormField
          v-slot="{ componentField, value }"
          name="resourcesReplicas"
          class="grow w-full"
        >
          <FormItem class="grow w-full">
            <FormLabel>Replicas</FormLabel>
            <FormControl>
              <Slider
                v-bind="componentField"
                :default-value="[1]"
                :max="60"
                :min="0"
                :step="1"
                slider-class="bg-card"
              />
              <FormDescription class="flex justify-between">
                <span>{{ value?.[0] }}</span>
              </FormDescription>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField, value }" name="resourcesCpu">
          <FormItem class="grow w-full">
            <FormLabel>CPU</FormLabel>
            <FormControl>
              <Slider
                v-bind="componentField"
                :default-value="[1.0]"
                :max="4.0"
                :min="0.1"
                :step="0.1"
                slider-class="bg-card"
              />
              <FormDescription class="flex justify-between">
                <span>{{ value?.[0] }}</span>
              </FormDescription>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField
          v-slot="{ componentField, value }"
          name="resourcesMemory"
          class="grow w-full"
        >
          <FormItem class="grow w-full">
            <FormLabel>Memory</FormLabel>
            <FormControl>
              <Slider
                v-bind="componentField"
                :default-value="[512]"
                :max="4096"
                :min="128"
                :step="128"
                slider-class="bg-card"
              />
              <FormDescription class="flex justify-between">
                <span>{{ value?.[0] }} Mb</span>
              </FormDescription>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="source" class="border border-b-0">
      <AccordionTrigger class="px-4 bg-transparent">Source</AccordionTrigger>
      <AccordionContent
        class="p-5 bg-background flex flex-col gap-5 flex-wrap"
        force-mount
        :is-open="sourceIsOpen"
      >
        <FormField v-slot="{ componentField }" name="sourceImage">
          <FormItem>
            <FormLabel>Image</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="registry/repository:tag"
                v-bind="componentField"
                class="bg-card"
              />
              <FormDescription>
                The Image field is where you specify the container image for
                your component
              </FormDescription>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="sourceCommand">
          <FormItem>
            <FormLabel>Command (optional)</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="yarn dev"
                v-bind="componentField"
                class="bg-card"
              />
              <FormDescription>
                Override the CMD property of your container image
              </FormDescription>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="network" class="border border-b-0">
      <AccordionTrigger class="px-4 bg-transparent">Network</AccordionTrigger>
      <AccordionContent
        class="p-5 bg-background flex flex-col gap-5 flex-wrap"
        force-mount
        :is-open="networkIsOpen"
      >
        <FormField
          v-slot="{ value, handleChange }"
          name="network.networkExpose"
        >
          <FormItem class="flex flex-col">
            <FormLabel>Expose the component</FormLabel>
            <FormControl>
              <Switch :checked="value" @update:checked="handleChange" />
              <FormDescription>
                Activate if you want to expose the component to other components
                in the application or to the outside world
              </FormDescription>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="network.networkType">
          <FormItem>
            <FormLabel>Type</FormLabel>
            <Select v-bind="componentField" default-value="public">
              <FormControl>
                <SelectTrigger class="bg-card">
                  <SelectValue placeholder="Select a network type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="private"> Private </SelectItem>
                  <SelectItem value="public"> Public </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <FormDescription>
              Select to whom you want to expose the component
            </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>
        <div class="space-y-2">
          <FieldArray
            v-slot="{ fields, push, remove }"
            name="network.networkPorts"
          >
            <Label>Ports</Label>
            <fieldset
              v-for="(field, idx) in fields"
              :key="field.key"
              class="flex flex-row gap-2 items-center"
            >
              <FormField
                v-slot="{ componentField }"
                :name="`network.networkPorts[${idx}].hostPort`"
              >
                <FormItem class="grow">
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Host"
                      v-bind="componentField"
                      class="bg-card"
                    />
                  </FormControl>
                  <p
                    v-if="networkPortErrors[idx]"
                    class="text-sm font-medium text-destructive"
                  >
                    {{ networkPortErrors[idx].hostPort }}
                  </p>
                </FormItem>
              </FormField>
              <span class="space-x-2">:</span>
              <FormField
                v-slot="{ componentField }"
                :name="`network.networkPorts[${idx}].targetPort`"
              >
                <FormItem class="grow">
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Target"
                      v-bind="componentField"
                      class="bg-card"
                    />
                  </FormControl>
                  <p
                    v-if="networkPortErrors[idx]"
                    class="text-sm font-medium text-destructive"
                  >
                    {{ networkPortErrors[idx].targetPort }}
                  </p>
                </FormItem>
              </FormField>
              <FormField
                v-slot="{ componentField }"
                :name="`network.networkPorts[${idx}].portProtocol`"
              >
                <FormItem class="w-24">
                  <FormControl>
                    <Select v-bind="componentField" default-value="TCP">
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
                  </FormControl>
                  <p
                    v-if="networkPortErrors[idx]"
                    class="text-sm font-medium text-destructive"
                  >
                    {{ networkPortErrors[idx].portProtocol }}
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
          </FieldArray>
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
