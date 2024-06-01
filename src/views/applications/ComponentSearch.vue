<script setup lang="ts">
import { ComponentService } from '@/services/organizations'
import ServiceIcon from '@/components/ServiceIcon.vue'
import { PropType, ref } from 'vue'
import Input from '@/components/ui/input/Input.vue'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

const props = defineProps({
  components: {
    type: Array as PropType<ComponentService[]>,
    required: true,
  },
  organizationId: {
    type: String,
    required: true,
  },
  applicationId: {
    type: String,
    required: true,
  },
  environmentId: {
    type: String,
    required: true,
  },
})
const openPopover = ref(false)

const componentList = props.components
const componentsFiltered = ref<ComponentService[]>(componentList)
const searchComponent = (event: Event) => {
  openPopover.value = true
  const search = (event.target as HTMLInputElement).value
  componentsFiltered.value = componentList.filter((component) => {
    return component.name.toLowerCase().includes(search.toLowerCase())
  })
}

const toggleOpen = () => {
  openPopover.value = !openPopover.value
}
</script>

<template>
  <Popover :open="openPopover">
    <PopoverTrigger as-child>
      <div class="grow">
        <Input
          type="search"
          placeholder="Search"
          class="focus-visible:ring-ring focus-visible:ring-1"
          @input="searchComponent"
          @blur="toggleOpen"
          @focus="toggleOpen"
        />
      </div>
    </PopoverTrigger>
    <PopoverContent class="p-0 overflow-hidden">
      <div class="flex flex-col divide-y">
        <div
          v-if="componentsFiltered.length === 0"
          class="p-10 text-center text-sm text-gray-500"
        >
          No results found
        </div>
        <div
          v-for="component in componentsFiltered"
          :key="component.id"
          class="p-2 cursor-pointer hover:bg-secondary"
        >
          <router-link
            v-slot="{ navigate }"
            :to="{
              name: 'componentDetails',
              params: { componentId: component.id },
            }"
            custom
          >
            <div class="flex gap-2 items-center" @click="navigate">
              <ServiceIcon :name="component.type" />
              <div class="text-sm">{{ component.name }}</div>
            </div>
          </router-link>
        </div>
      </div>
    </PopoverContent>
  </Popover>
</template>
