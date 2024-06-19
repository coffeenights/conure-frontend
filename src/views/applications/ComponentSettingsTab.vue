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

import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { ComponentSettingsSchema } from '@/services/variables'
import { configure } from 'vee-validate'

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
  },
})
</script>

<template>
  <Accordion type="multiple" collapsible>
    <AccordionItem value="general" class="border border-b-0 rounded-t-md">
      <AccordionTrigger class="px-4 bg-transparent">General</AccordionTrigger>
      <AccordionContent class="p-5 bg-background flex flex-col gap-5 flex-wrap">
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
      <AccordionContent class="p-5 bg-background flex flex-row gap-5">
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
      <AccordionContent class="p-5 bg-background flex flex-row gap-5 flex-wrap">
        Yes. It adheres to the WAI-ARIA design pattern.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="network" class="border border-b-0">
      <AccordionTrigger class="px-4 bg-transparent">Network</AccordionTrigger>
      <AccordionContent class="p-5 bg-background flex flex-row gap-5 flex-wrap">
        Yes. It adheres to the WAI-ARIA design pattern.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="storage" class="border rounded-b-md">
      <AccordionTrigger class="px-4 bg-transparent">Storage</AccordionTrigger>
      <AccordionContent
        class="p-5 bg-background rounded-b-md flex flex-row gap-5 flex-wrap"
      >
        Yes. It adheres to the WAI-ARIA design pattern.
      </AccordionContent>
    </AccordionItem>
  </Accordion>
  <div class="flex w-full mt-2">
    <Button class="grow">Save</Button>
  </div>
</template>

<style scoped></style>
