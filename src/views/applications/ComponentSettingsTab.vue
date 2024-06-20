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
import { ComponentSettingsSchema } from '@/services/variables'
import { configure, FieldArray } from 'vee-validate'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'

configure({
  validateOnBlur: false,
  validateOnChange: true,
  validateOnInput: false,
  validateOnModelUpdate: true,
})

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: toTypedSchema(ComponentSettingsSchema),
  initialValues: {
    resourcesCpu: [1.0],
    resourcesMemory: [512],
    resourcesReplicas: [1],
    networkPorts: [{ hostPort: null, targetPort: null, portProtocol: 'TCP' }],
  },
})

// const { push, remove, fields } = useFieldArray('ports')
const generalIsOpen = ref(true)
const resourcesIsOpen = ref(true)
const sourceIsOpen = ref(false)
const networkIsOpen = ref(false)
const storageIsOpen = ref(false)

const handleAccordionTrigger = (newValue) => {
  generalIsOpen.value = newValue.includes('general')
  resourcesIsOpen.value = newValue.includes('resources')
  sourceIsOpen.value = newValue.includes('source')
  networkIsOpen.value = newValue.includes('network')
  storageIsOpen.value = newValue.includes('storage')
}
</script>

<template>
  <Accordion
    type="multiple"
    :default-value="['general', 'resources']"
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
        <FormField v-slot="{ componentField }" name="networkExpose">
          <FormItem class="flex flex-col">
            <FormLabel>Expose the component</FormLabel>
            <FormControl>
              <Switch v-bind="componentField" />
              <FormDescription>
                Activate if you want to expose the component to other components
                in the application or to the outside world
              </FormDescription>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="networkType">
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
          <FieldArray v-slot="{ fields, push, remove }" name="networkPorts">
            <Label>Ports</Label>
            <fieldset
              v-for="(field, idx) in fields"
              :key="field.key"
              class="flex flex-row gap-2 items-center"
            >
              <FormField
                v-slot="{ componentField }"
                :name="`networkPorts[${idx}].hostPort`"
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
                  <FormMessage />
                </FormItem>
              </FormField>
              <span class="space-x-2">:</span>
              <FormField
                v-slot="{ componentField }"
                :name="`networkPorts[${idx}].targetPort`"
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
                  <FormMessage />
                </FormItem>
              </FormField>
              <FormField v-slot="{ componentField }" :name="`networkPorts[${idx}].portProtocol`">
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
                  <FormMessage />
                </FormItem>
              </FormField>
              <Button size="icon" variant="ghost" @click="remove(idx)">
                <span class="bi-trash text-xl cursor-pointer"></span>
              </Button>
            </fieldset>
            <Button size="sm" variant="secondary" @click="push({ hostPort: null, targetPort: null, portProtocol: 'TCP' })">
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
        Yes. It adheres to the WAI-ARIA design pattern.
      </AccordionContent>
    </AccordionItem>
  </Accordion>
  <div class="flex w-full my-5">
    <Button class="grow">Save</Button>
  </div>
</template>
