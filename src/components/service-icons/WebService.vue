<script setup lang="ts">

type IconFile = {
  [key: string]: string
}
const serviceIcon: IconFile = {
  docker: 'docker.svg',
  webservice: 'serverstack.svg',
  mariadb: 'mariadb.svg',
  mysql: 'mysql.svg',
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
  return new URL(`/src/assets/icons/${name}.svg`, import.meta.url).href
}
</script>

<template>
  <img :src="getImageUrl('serverstack')" alt="Web Service" class="w-10 h-12" />
</template>

<style scoped>

</style>
