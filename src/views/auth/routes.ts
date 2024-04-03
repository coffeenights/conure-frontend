import ChangePassword from './ChangePassword.vue'
import { RouteRecordRaw } from 'vue-router'
import LoginForm from './LoginForm.vue'
import CurrentUser from './CurrentUser.vue'

const authRoutes: Array<RouteRecordRaw> = [
  {
    path: '/auth/login',
    component: LoginForm,
    name: 'login',
  },
  {
    path: '/auth/me',
    component: CurrentUser,
    name: 'me',
  },
  {
    path: '/auth/change-password',
    component: ChangePassword,
    name: 'change-password',
  },
]

export default authRoutes