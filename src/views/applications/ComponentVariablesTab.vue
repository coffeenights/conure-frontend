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

const invoices = [
  {
    name: 'PG_URL',
    scope: 'Component',
    value: 'postgres://conure:test123@localhost:54320/conure',
  },
]
</script>

<template>
  <div class="flex flex-row gap-2 flex-wrap border rounded-md p-2">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead class="">Name</TableHead>
          <TableHead>Scope</TableHead>
          <TableHead>Value</TableHead>
          <TableHead class="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody class="[&_tr:last-child]:border-1">
        <TableRow v-for="invoice in invoices" :key="invoice.name">
          <TableCell class="font-medium">
<!--            <input v-model="invoice.name" />-->
            <Input model-value="invoice.name" class="border-0 h-7"/>
          </TableCell>
          <TableCell>{{ invoice.scope }}</TableCell>
          <TableCell><input v-model="invoice.value" class="w-full" /></TableCell>
          <TableCell class="text-right">
            <span class="bi-trash text-xl cursor-pointer"></span>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
    <div class="px-2 pb-2">
      <div class="border rounded-md py-1 px-2 text-lg cursor-pointer hover:border-gray-500 dark:hover:border-gray-500 transition duration-500">
        <span class="bi-plus-lg"></span>
      </div>
    </div>
  </div>
</template>
