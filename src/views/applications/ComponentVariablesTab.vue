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
            <Input model-value="invoice.name" class="border-0 h-7"/>
          </TableCell>
          <TableCell>{{ invoice.scope }}</TableCell>
          <TableCell>
            <Input model-value="invoice.value" class="border-0 h-7"/>
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
