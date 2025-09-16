import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/home/index.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        // 一级路由
        {
            path: '/',
            component: Home,
        },
    ],
    // 路由滚动行为定制
    scrollBehavior() {
        return {
            top: 0
        }
    }
})

export default router