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

const component = ref({
  name: '',
  description: '',
})
</script>

<template>
  <Accordion type="multiple" collapsible>
    <AccordionItem value="general" class="border border-b-0 rounded-t-md">
      <AccordionTrigger class="px-4 bg-transparent">General</AccordionTrigger>
      <AccordionContent class="p-5 bg-background flex flex-col gap-5 flex-wrap">
        <FormField v-slot="{ componentField }" name="username">
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
        <FormField v-slot="{ componentField, value }" name="duration" class="grow w-full">
          <FormItem class="grow w-full">
            <FormLabel>Replicas</FormLabel>
            <FormControl>
              <Slider
                v-bind="componentField"
                :default-value="[1]"
                :max="20"
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
        <FormField v-slot="{ componentField, value }" name="duration">
          <FormItem class="grow w-full">
            <FormLabel>Replicas</FormLabel>
            <FormControl>
              <Slider
                v-bind="componentField"
                :default-value="[1]"
                :max="20"
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
        <FormField v-slot="{ componentField, value }" name="duration" class="grow w-full">
          <FormItem class="grow w-full">
            <FormLabel>Replicas</FormLabel>
            <FormControl>
              <Slider
                v-bind="componentField"
                :default-value="[1]"
                :max="20"
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
