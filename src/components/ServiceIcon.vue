<script setup lang="ts">
import { cn } from '@/utils'
import { useDarkMode } from '@/composables/useDarkMode'

const props = defineProps({
  name: String,
  alt: {
    type: String,
    default: 'Service Icon',
  },
  class: {
    type: String,
    default: '',
    optional: true,
  },
})

const { isDarkMode } = useDarkMode()

type IconFile = {
  [key: string]: string
}
const serviceIcon: IconFile = {
  docker: 'docker.svg',
  webservice: 'cloudServer.svg',
  oneoff: 'PlayCircle.svg',
  cron: 'calendar.svg',
  stateful: 'Database.svg',
  static: 'FileImage.svg',
  mariadb: 'mariadb.svg',
  mysql: 'mysql.svg',
  github: 'github.svg',
  githubDark: 'github-dark.svg',
  raw: 'postgres.svg',
  redis: 'redis.svg',
  nodejs: 'nodejs.svg',
  python: 'python.svg',
  aws: 'aws_logo.svg',
  awsDark: 'aws_logo_dark.svg',
  awsRds: 'aws_rds.svg',
  awsRdsDark: 'aws_rds_dark.svg',
}

function getImageUrl(name: string) {
  let icon: string
  icon = serviceIcon[name]
  if (isDarkMode) {
    if (Object.prototype.hasOwnProperty.call(serviceIcon, `${name}Dark`)) {
      icon = serviceIcon[`${name}Dark`]
    }
  }
  return new URL(`/src/assets/icons/${icon}`, import.meta.url).href
}
</script>

<template>
  <img
    :src="getImageUrl(name as string)"
    :alt="alt"
    :class="cn('w-10 h-12', props.class)"
  />
</template>

<style scoped></style>
