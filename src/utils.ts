import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const location = '/src/assets/icons/'

type IconFile = {
  [key: string]: string
}
export const serviceIcon: IconFile = {
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

export function getIconPath(icon: string) {
  return `${location}${serviceIcon[icon]}`
}
