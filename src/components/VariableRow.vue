<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
import { TableCell, TableRow } from '@/components/ui/table'
import { Input } from '@/components/ui/input'

defineProps({
  pKey: {
    type: String,
    default: '',
  },
  pValue: {
    type: String,
    default: '',
  },
  scope: {
    type: String,
    default: '',
  },
  isEncrypted: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <TableRow>
    <TableCell class="font-medium">
      <Input v-model="pKey" class="border-0 h-7" />
    </TableCell>
    <TableCell>
      <Badge variant="secondary">{{ scope }}</Badge>
    </TableCell>
    <TableCell>
      <Input v-model="value" class="border-0 h-7" />
    </TableCell>
    <TableCell class="text-right">
      <span class="bi-trash text-xl cursor-pointer"></span>
    </TableCell>
  </TableRow>
</template>
