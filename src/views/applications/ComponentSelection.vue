<script setup lang="ts">
import {
  CardDivider,
  ComponentSelectionCard,
  ComponentView,
} from '@/components'
</script>

<template>
  <ComponentView>
    <CardDivider title="Services" />
    <div class="flex flex-row flex-wrap mt-5 gap-5">
      <ComponentSelectionCard
        alt="Web Service"
        name="webservice"
        title="Web Service"
      />
      <ComponentSelectionCard
        alt="One-Off Job"
        name="oneoff"
        title="One-Off Job"
      />
      <ComponentSelectionCard alt="Cron Job" name="cron" title="Cron Job" />
      <ComponentSelectionCard
        alt="Stateful Service"
        name="stateful"
        title="Stateful Service"
      />
      <ComponentSelectionCard
        alt="Static Site"
        name="static"
        title="Static Site"
      />
    </div>
  </ComponentView>
</template>
