<script setup lang="ts">
import { ref, watch } from 'vue'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { z, ZodIssue } from 'zod'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from '@/components/ui/number-field'
import {
  ComponentService,
  deleteComponent,
  detailsComponent,
  ResourcesArrays,
  Storage,
  updateComponent,
} from '@/services/organizations'
import { registerError } from '@/services/errors'
import { useBreadCrumbStore } from '@/stores/BreadCrumbStore'
import { useRoute, useRouter } from 'vue-router'
import SettingsErrorMessage from '@/components/SettingsErrorMessage.vue'
import { notify } from '@/services/notifications'

const generalIsOpen = ref(true)
const resourcesIsOpen = ref(true)
const sourceIsOpen = ref(false)
const networkIsOpen = ref(false)
const storageIsOpen = ref(false)
const dangerIsOpen = ref(false)

const isSubmitting = ref(false)

const errors = ref([] as ZodIssue[])
const resourceErrors = ref([] as ZodIssue[])
const networkErrors = ref([] as ZodIssue[])
const storageErrors = ref([] as ZodIssue[])
const sourceErrors = ref([] as ZodIssue[])
const accordionItems = ref(['general', 'resources'] as string[])

const deleteComponentBox = ref('')

const componentUpdate = ref({
  name: '',
  type: '',
  description: '',
  settings: {
    network_settings: {
      exposed: false,
      type: 'public',
      ports: [
        { host_port: undefined, target_port: undefined, protocol: 'tcp' },
      ],
    },
    storage_settings: [] as Storage[],
    source_settings: {
      repository: '',
      command: '',
    },
  },
} as ComponentService)
const component = ref({} as ComponentService)

const componentResources = ref({
  replicas: [1],
  cpu: [1.0],
  memory: [512],
} as ResourcesArrays)

const isLoading = ref(true)
const breadCrumbStore = useBreadCrumbStore()
const route = useRoute()
const router = useRouter()

const fetchData = () => {
  isLoading.value = true
  detailsComponent(
    breadCrumbStore.organizationId,
    breadCrumbStore.applicationId,
    breadCrumbStore.environment,
    route.params.componentId as string,
  )
    .then((response) => {
      component.value = response.data
      componentUpdate.value = response.data
      componentResources.value.replicas = [
        response.data.settings.resources_settings.replicas,
      ]
      componentResources.value.cpu = [
        response.data.settings.resources_settings.cpu,
      ]
      componentResources.value.memory = [
        response.data.settings.resources_settings.memory,
      ]
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

const networkSchema = z.object({
  exposed: z.boolean(),
  type: z.enum(['private', 'public']),
  ports: z.array(
    z.object({
      host_port: z.number().min(1).max(65535),
      target_port: z.number().min(1).max(65535),
      protocol: z.enum(['tcp', 'udp']),
    }),
  ),
})

const storageSchema = z
  .array(
    z.object({
      name: z.string().max(50).trim().min(1, 'Field is required'),
      mount_path: z.string().max(100).trim().min(1, 'Field is required'),
      size: z.number().min(0.1).max(100.0),
    }),
  )
  .optional()

const resourcesSchema = z.object({
  cpu: z.array(z.number().min(0.1).max(4.0)),
  memory: z.array(z.number().min(128).max(4096)),
  replicas: z.array(z.number().min(0).max(60)),
})

const sourceSchema = z.object({
  repository: z.string().max(255).min(1, 'Field is required'),
  command: z.string().max(255).optional(),
})

const schemaSettings = z.object({
  name: z.string().max(50).min(1, 'Field is required'),
  description: z.string().max(255).optional(),
})
const isStringArray = (value: unknown): value is string[] => {
  return (
    Array.isArray(value) &&
    value.every((element) => typeof element === 'string')
  )
}

const handleAccordionTrigger = (newValue: string | string[] | undefined) => {
  if (isStringArray(newValue)) {
    generalIsOpen.value = newValue.includes('general')
    resourcesIsOpen.value = newValue.includes('resources')
    sourceIsOpen.value = newValue.includes('source')
    networkIsOpen.value = newValue.includes('network')
    storageIsOpen.value = newValue.includes('storage')
    dangerIsOpen.value = newValue.includes('danger')
  }
}

const openAccordionItem = (value: string) => {
  if (!accordionItems.value.includes(value)) {
    accordionItems.value.push(value)
  }
  handleAccordionTrigger(accordionItems.value)
}

const onSubmit = () => {
  isSubmitting.value = true

  // Reset all error messages
  errors.value = [] as ZodIssue[]
  resourceErrors.value = [] as ZodIssue[]
  networkErrors.value = [] as ZodIssue[]
  storageErrors.value = [] as ZodIssue[]
  sourceErrors.value = [] as ZodIssue[]

  let allSuccess: boolean = true

  const validationResult = schemaSettings.safeParse(componentUpdate.value)
  if (!validationResult.success) {
    errors.value = validationResult.error?.errors || []
    allSuccess = false
    openAccordionItem('general')
  }

  const sourceValidationResult = sourceSchema.safeParse(
    componentUpdate.value.settings.source_settings,
  )
  if (!sourceValidationResult.success) {
    sourceErrors.value = sourceValidationResult.error?.errors || []
    allSuccess = false
    openAccordionItem('source')
  }

  const resourcesValidationResult = resourcesSchema.safeParse(
    componentResources.value,
  )
  if (!resourcesValidationResult.success) {
    resourceErrors.value = resourcesValidationResult.error?.errors || []
    allSuccess = false
    openAccordionItem('resources')
  }

  if (componentUpdate.value.settings.network_settings.exposed) {
    const networkValidationResult = networkSchema.safeParse(
      componentUpdate.value.settings.network_settings,
    )
    if (!networkValidationResult.success) {
      networkErrors.value = networkValidationResult.error?.errors || []
      allSuccess = false
      openAccordionItem('network')
    }
  }
  const storageValidationResult = storageSchema.safeParse(
    componentUpdate.value.settings.storage_settings,
  )
  if (!storageValidationResult.success) {
    storageErrors.value = storageValidationResult.error?.errors || []
    allSuccess = false
    openAccordionItem('storage')
  }

  if (allSuccess) {
    // update the resources on the component
    componentUpdate.value.settings.resources_settings = {
      cpu: componentResources.value.cpu[0],
      memory: componentResources.value.memory[0],
      replicas: componentResources.value.replicas[0],
    }
    updateComponent(
      breadCrumbStore.organizationId,
      breadCrumbStore.applicationId,
      breadCrumbStore.environment,
      route.params.componentId as string,
      componentUpdate.value,
    )
      .then(() => {
        notify('Success', 'Component has been updated!')
      })
      .catch((error) => {
        registerError(error)
        throw error
      })
      .finally(() => {
        isSubmitting.value = false
      })
  } else {
    registerError(
      'Validation error',
      {
        title: 'Error',
        description: 'Some of the fields are invalid. Please check the form.',
      },
      true,
    )
  }

  isSubmitting.value = false
}

const addNewPort = () => {
  componentUpdate.value.settings.network_settings.ports.push({
    host_port: undefined,
    target_port: undefined,
    protocol: 'tcp',
  })
}

const removePort = (index: number) => {
  componentUpdate.value.settings.network_settings.ports.splice(index, 1)
}

const addNewVolume = () => {
  componentUpdate.value.settings.storage_settings.push({
    name: undefined,
    mount_path: undefined,
    size: 0.1,
  })
}

const removeVolume = (index: number) => {
  componentUpdate.value.settings.storage_settings.splice(index, 1)
}

const changeExposed = (value: boolean) => {
  componentUpdate.value.settings.network_settings.exposed = value
}

const onDeleteComponent = () => {
  deleteComponent(
    breadCrumbStore.organizationId,
    breadCrumbStore.applicationId,
    breadCrumbStore.environment,
    route.params.componentId as string,
  )
    .then(() => {
      router.push({
        name: 'componentList',
        params: {
          organizationId: breadCrumbStore.organizationId,
          applicationId: breadCrumbStore.applicationId,
          environment: breadCrumbStore.environment,
        },
      })
      notify(
        'Success',
        'Component ' + component.value.name + 'has been deleted!',
      )
    })
    .catch((error) => {
      registerError(error)
      throw error
    })
}
</script>

<template>
  <Accordion
    v-model="accordionItems"
    type="multiple"
    :default-value="accordionItems"
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
            v-model="componentUpdate.name"
            type="text"
            placeholder="Component's name"
            class="bg-card"
            name="name"
          />
          <SettingsErrorMessage path="name" :errors="errors" />
        </div>
        <div class="space-y-2">
          <Label>Description (optional)</Label>
          <Textarea
            v-model="componentUpdate.description"
            type="text"
            placeholder="Describe your component here..."
            class="bg-card"
            name="description"
          />
          <SettingsErrorMessage path="description" :errors="errors" />
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
            v-model="componentResources.replicas"
            :default-value="[1]"
            :max="60"
            :min="0"
            :step="1"
            slider-class="bg-card"
            name="resources_replicas"
          />
          <div class="flex justify-between text-sm text-muted-foreground">
            <span>{{ componentResources.replicas[0] }}</span>
          </div>
          <SettingsErrorMessage path="replicas.0" :errors="resourceErrors" />
        </div>
        <div class="grow w-full space-y-2">
          <Label>CPU</Label>
          <Slider
            v-model="componentResources.cpu"
            :default-value="[1.0]"
            :max="4.0"
            :min="0.1"
            :step="0.1"
            slider-class="bg-card"
            name="resourcesCpu"
          />
          <div class="flex justify-between text-sm text-muted-foreground">
            <span>{{ componentResources.cpu[0] }}</span>
          </div>
          <SettingsErrorMessage path="cpu.0" :errors="resourceErrors" />
        </div>
        <div class="grow w-full space-y-2">
          <Label>Memory</Label>
          <Slider
            v-model="componentResources.memory"
            :default-value="[512]"
            :max="4096"
            :min="128"
            :step="128"
            slider-class="bg-card"
            name="resourcesMemory"
          />
          <div class="flex justify-between text-sm text-muted-foreground">
            <span>{{ componentResources.memory[0] }} Mb</span>
          </div>
          <SettingsErrorMessage path="memory.0" :errors="resourceErrors" />
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
            v-model="componentUpdate.settings.source_settings.repository"
            type="text"
            placeholder="registry/repository:tag"
            class="bg-card"
            name="sourceImage"
          />
          <div class="text-sm text-muted-foreground">
            The Image field is where you specify the container image for your
            component
          </div>
          <SettingsErrorMessage path="repository" :errors="sourceErrors" />
        </div>
        <div class="space-y-2">
          <Label>Command (optional)</Label>
          <Input
            v-model="componentUpdate.settings.source_settings.command"
            type="text"
            placeholder="yarn dev"
            class="bg-card"
            name="sourceCommand"
          />
          <div class="text-sm text-muted-foreground">
            Override the CMD property of your container image
          </div>
          <SettingsErrorMessage path="command" :errors="sourceErrors" />
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
            v-model="componentUpdate.settings.network_settings.exposed"
            :checked="componentUpdate.settings.network_settings.exposed"
            name="network.networkExpose"
            @update:checked="changeExposed"
          />
          <div class="text-sm text-muted-foreground">
            Activate if you want to expose the component to other components in
            the application or to the outside world
          </div>
          <SettingsErrorMessage path="exposed" :errors="networkErrors" />
        </div>

        <div class="space-y-2">
          <Label>Type</Label>
          <Select
            v-model="componentUpdate.settings.network_settings.type"
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
          <SettingsErrorMessage path="type" :errors="networkErrors" />
        </div>
        <div class="space-y-2">
          <Label>Ports</Label>
          <fieldset
            v-for="(port, idx) in componentUpdate.settings.network_settings
              .ports"
            :key="idx"
            class="flex flex-row gap-2 items-center"
          >
            <div class="grow space-y-2">
              <Input
                v-model="port.host_port"
                type="number"
                placeholder="Host"
                class="bg-card"
              />
              <SettingsErrorMessage
                :path="'ports.' + idx + '.host_port'"
                :errors="networkErrors"
              />
            </div>
            <span class="space-x-2">:</span>
            <div class="grow space-y-2">
              <Input
                v-model="port.target_port"
                type="number"
                placeholder="Target"
                class="bg-card"
              />
              <SettingsErrorMessage
                :path="'ports.' + idx + '.target_port'"
                :errors="networkErrors"
              />
            </div>
            <div class="w-24 space-y-2">
              <Select v-model="port.protocol" default-value="TCP">
                <SelectTrigger class="bg-card">
                  <SelectValue placeholder="Select a protocol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="tcp"> TCP </SelectItem>
                    <SelectItem value="udp"> UDP </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <SettingsErrorMessage
                :path="'ports.' + idx + '.protocol'"
                :errors="networkErrors"
              />
            </div>
            <Button size="icon" variant="ghost" @click="removePort(idx)">
              <span class="bi-trash text-xl cursor-pointer"></span>
            </Button>
          </fieldset>
          <Button size="sm" variant="secondary" @click="addNewPort()">
            <span class="bi-plus text-xl cursor-pointer"></span>
          </Button>
        </div>
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="storage" class="border border-b-0">
      <AccordionTrigger class="px-4 bg-transparent">Storage</AccordionTrigger>
      <AccordionContent
        class="p-5 bg-background flex flex-col gap-5 flex-wrap rounded-b-md"
        force-mount
        :is-open="storageIsOpen"
      >
        <fieldset
          v-for="(storage, idx) in componentUpdate.settings.storage_settings"
          :key="idx"
          class="flex flex-row gap-2 items-center"
        >
          <div class="grow space-y-2">
            <Label>Name</Label>
            <Input
              v-model="storage.name"
              type="text"
              placeholder="Volume name"
              class="bg-card"
            />
            <div class="text-sm text-muted-foreground">
              Indicate a name to identify the volume
            </div>
            <SettingsErrorMessage
              :path="idx + '.name'"
              :errors="storageErrors"
            />
          </div>
          <div class="grow space-y-2">
            <Label>Mount Path</Label>
            <Input
              v-model="storage.mount_path"
              type="text"
              placeholder="/path/to/mount"
              class="bg-card"
            />
            <div class="text-sm text-muted-foreground">
              Where inside the component will the volume be mounted
            </div>
            <SettingsErrorMessage
              :path="idx + '.mount_path'"
              :errors="storageErrors"
            />
          </div>
          <div class="grow space-y-2">
            <Label>Size</Label>
            <NumberField
              v-model="storage.size"
              :min="0.1"
              :max="100"
              :step="0.1"
              :default-value="0.1"
            >
              <NumberFieldContent>
                <NumberFieldDecrement />
                <NumberFieldInput class="bg-card" />
                <NumberFieldIncrement />
              </NumberFieldContent>
            </NumberField>
            <div class="text-sm text-muted-foreground">
              Value indicates the size of the volume in GB
            </div>
            <SettingsErrorMessage
              :path="idx + '.size'"
              :errors="storageErrors"
            />
          </div>
          <Button size="icon" variant="ghost" @click="removeVolume(idx)">
            <span class="bi-trash text-xl cursor-pointer"></span>
          </Button>
        </fieldset>
        <Button
          size="sm"
          variant="secondary"
          class="w-12"
          @click="addNewVolume()"
        >
          <span class="bi-plus text-xl cursor-pointer"></span>
        </Button>
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="danger" class="border rounded-b-md">
      <AccordionTrigger class="px-4 bg-transparent"
        >Danger Zone</AccordionTrigger
      >
      <AccordionContent
        class="p-5 bg-background flex flex-col gap-5 flex-wrap rounded-b-md"
        force-mount
        :is-open="dangerIsOpen"
      >
        <Dialog>
          <DialogTrigger as-child>
            <Button
              :disabled="isSubmitting"
              variant="outline"
              class="grow border-destructive text-destructive"
              >Delete</Button
            >
          </DialogTrigger>
          <DialogContent class="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Warning!</DialogTitle>
              <DialogDescription>
                This action will delete the component and all its data.<br />
                Type the name of the component (<b class="text-primary">{{
                  component.name
                }}</b
                >) to confirm:
              </DialogDescription>
            </DialogHeader>
            <div class="flex items-center space-x-2">
              <div class="grid flex-1 gap-2">
                <Label for="link" class="sr-only"> Link </Label>
                <Input
                  id="link"
                  v-model="deleteComponentBox"
                  :placeholder="component.name"
                  autocomplete="off"
                />
              </div>
            </div>
            <DialogFooter class="sm:justify-start">
              <Button
                :disabled="deleteComponentBox !== component.name"
                type="button"
                variant="destructive"
                @click="onDeleteComponent()"
              >
                Delete
              </Button>
              <DialogClose as-child>
                <Button type="button" variant="secondary"> Close </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
  <div class="flex w-full py-5">
    <Button :disabled="isSubmitting" class="grow" @click="onSubmit">
      Save
    </Button>
  </div>
</template>
