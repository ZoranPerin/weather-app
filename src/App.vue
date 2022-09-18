<template>
	<div class="page">

		<Header />

		<router-view />

		<Settings />

	</div>
</template>

<script>
import cloneObject from '@/services/mixins/cloneObject'

export default {
	name: 'App',
	metaInfo() {
		return {
			titleTemplate: '%s | Weather Forecast App',
			link: [
				{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap' },
				{ rel: 'apple-touch-icon', sizes: '180x180', href: `/images/favicons/${this.settings.config.theme}/apple-touch-icon.png` },
				{ rel: 'icon', type: 'image/png', sizes: '32x32', href: `/images/favicons/${this.settings.config.theme}/favicon-32x32.png` },
				{ rel: 'icon', type: 'image/png', sizes: '16x16', href: `/images/favicons/${this.settings.config.theme}/favicon-16x16.png` },
				{ rel: 'manifest', href: `/images/favicons/${this.settings.config.theme}/site.webmanifest` }
			]
		}
	},
	components: {
		Header: () => import(/* webpackPrefetch: true */ '@/views/components/Header'),
		Settings: () => import(/* webpackPrefetch: true */ '@/views/components/Settings')
	},
	mixins: [
		cloneObject
	],
	watch: {
		'settings.config.theme' () {
			this.setTheme()
		}
	},
	created () {
		this.getDataFromStorage()
		this.setTheme()
	},
	methods: {
		getDataFromStorage () {
			if (localStorage.getItem('WEATHER_APP_SETTINGS')) {
				this.$store.dispatch('updateSettings', JSON.parse(localStorage.getItem('WEATHER_APP_SETTINGS')))
			}
			if (localStorage.getItem('WEATHER_APP_DATA')) {
				this.$store.dispatch('setFavorites', JSON.parse(localStorage.getItem('WEATHER_APP_DATA')))
			}
		},
		setTheme () {
			let theme
			if (localStorage.getItem('WEATHER_APP_SETTINGS')) {
				theme = this.settings.config.theme
			} else {
				theme = window.matchMedia('(prefers-color-scheme: dark)') ? 'dark' : 'light'
				let settings = this.cloneObject(this.settings)
				settings.config.theme = theme
				this.$store.dispatch('updateSettings', settings)
			}
			if (theme === 'dark') {
				document.body.classList.add('dark-mode')
			} else {
				document.body.classList.remove('dark-mode')
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.page {
	overflow-x: hidden;
	position: relative;
	width: 100%;
}
</style>
