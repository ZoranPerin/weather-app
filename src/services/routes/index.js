import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
	mode: 'history',
	scrollBehavior: (to, from, savedPosition) => {
		return savedPosition || { x: 0, y: 0 }
	},
	routes: [
		{
			path: '/',
			redirect: '/main',
			component: () => import(/* webpackChunkName: "Weather" */ '@/views/Main')
		},
		{
			path: '/main',
			component: () => import(/* webpackChunkName: "Weather" */ '@/views/Main')
		},
		{
			path: '/main/:id',
			component: () => import(/* webpackChunkName: "Weather" */ '@/views/Main')
		},
		{
			path: '/favorites',
			component: () => import(/* webpackChunkName: "Favorites" */ '@/views/Favorites')
		}
	]
})

export default router
