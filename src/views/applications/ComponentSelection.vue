<script setup lang="ts">
import { ComponentView } from '@/components'

const data = {
  properties: {
    objects: {
      items: {
        type: 'object',
      },
      title: 'objects',
      type: 'array',
    },
  },
  required: ['objects'],
  type: 'object',
}

type SchemaField = {
  properties: any
  required: string[]
  type: string
}

const parseSchema = (schema: any) => {
  const properties = schema.properties
  const required = schema.required
  const type = schema.type


  return { properties, required, type }
}
</script>

<template>
  <ComponentView> </ComponentView>
</template>

<style scoped></style>
