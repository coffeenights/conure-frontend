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
import { watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import { listComponentVariables, Variable } from '@/services/variables'

const route = useRoute()
const variables = ref([] as Variable[])

watch(() => route.params.id, fetchVariables, { immediate: true })

function fetchVariables() {
  listComponentVariables(
    route.params.organizationId as string,
    route.params.applicationId as string,
    route.params.environment as string,
    route.params.componentId as string,
  )
    .then((response) => {
      variables.value = response.data
    })
    .catch((error) => {
      throw error
    })
}
</script>

<template>
  <div class="flex flex-row gap-2 flex-wrap border rounded-md p-2">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead class="w-72">Scope</TableHead>
          <TableHead>Value</TableHead>
          <TableHead class="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody class="[&_tr:last-child]:border-1">
        <TableRow v-for="variable in variables" :key="variable.id">
          <TableCell class="font-medium">
            <Input v-model="variable.name" class="border-0 h-7" />
          </TableCell>
          <TableCell>
            <Badge variant="secondary">
              {{ variable.type }}
            </Badge>
          </TableCell>
          <TableCell>
            <Input v-model="variable.value" class="border-0 h-7" />
          </TableCell>
          <TableCell class="text-right">
            <span class="bi-trash text-xl cursor-pointer"></span>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
    <div class="px-2 pb-2">
      <Button variant="outline" size="icon">
        <span class="bi-plus-lg text-xl"></span>
      </Button>
    </div>
  </div>
</template>
