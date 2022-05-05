import InvoiceView from '@/views/InvoiceView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NewInvoice from "@/views/NewInvoice.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/invoice/:id',
      name: 'invoice',
      component: InvoiceView
    },
    {
      path: '/newInvoice',
      name: 'newInvoice',
      component: NewInvoice
    }
  ]
})

export default router
