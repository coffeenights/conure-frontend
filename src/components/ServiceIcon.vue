<script setup lang="ts">
import { cn } from '@/utils'
import { useDarkModeStore } from '@/stores/DarkModeStore'
import { watch, ref, onMounted } from 'vue'

const props = defineProps<{
  name: string
  alt: string
  class?: string
}>()

watch(
  () => useDarkModeStore().isDarkMode,
  () => {
    imageUrl.value = getImageUrl(props.name)
  },
)

type IconFile = {
  [key: string]: string
}
const serviceIcon: IconFile = {
  docker: 'docker.svg',
  webservice: 'cloudServer.svg',
  webserviceDark: 'cloudServerDark.svg',
  oneoff: 'PlayCircle.svg',
  oneoffDark: 'PlayCircleDark.svg',
  cron: 'calendar.svg',
  cronDark: 'calendar-dark.svg',
  stateful: 'Database.svg',
  statefulDark: 'DatabaseDark.svg',
  static: 'FileImage.svg',
  staticDark: 'FileImageDark.svg',
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
  logo: 'conure-logo.svg',
  logoDark: 'conure-logo-dark-2.svg',
  // logo: 'conure-logo-2.svg',
}

const imageUrl = ref('')
onMounted(() => {
  imageUrl.value = getImageUrl(props.name)
})

function getImageUrl(name: string) {
  let icon: string
  icon = serviceIcon[name]
  if (useDarkModeStore().isDarkMode) {
    if (Object.prototype.hasOwnProperty.call(serviceIcon, `${name}Dark`)) {
      icon = serviceIcon[`${name}Dark`]
    }
  }
  return new URL(`/src/assets/icons/${icon}`, import.meta.url).href
}
</script>

<template>
  <img :src="imageUrl" :alt="alt" :class="cn('w-10 h-12', props.class)" />
</template>

<style scoped></style>
