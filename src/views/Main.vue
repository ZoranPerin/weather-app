<template>
	<div
		v-loading="loading"
		class="main"
	>
		<div
			v-if="ready"
			class="container"
		>

			<div class="row center">
				<div class="col-lg-6 col-md-10 col-sm-12">
					<Search />
				</div>
			</div>

			<template v-if="objectLength(location) > 0 && objectLength(weatherCurrent) > 0">

				<div class="row">
					<div class="col-lg-12">
						<div class="current-location">

							<Current
								:current="weatherCurrent"
								:location="location"
							/>

							<div
								v-if="weatherForecast"
								class="current-location-forecast"
							>
								<carousel :perPageCustom="[[300, 1], [600, 2], [768, 3],[1024, 5]]">
									<slide
										v-for="(item, index) in weatherForecast"
										:key="index"
									>
										<Day
											:item="item"
											:current="weatherCurrent"
										/>
									</slide>
								</carousel>
							</div>

						</div>
					</div>
				</div>

			</template>

		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import { EventBus } from '@/services/event-bus'
import { axiosGetLocationData, axiosGetWeatherData, axiosSearchLocation } from '@/services/api/weather'

import cloneObject from '@/services/mixins/cloneObject'
import locationWeather from '@/services/mixins/locationWeather'
import objectLength from '@/services/mixins/objectLength'

import { Carousel, Slide } from 'vue-carousel'

export default {
	name: 'Main',
	metaInfo () {
		return {
			title: 'Main'
		}
	},
	mixins: [
		cloneObject,
		locationWeather,
		objectLength
	],
	components: {
		Current: () => import(/* webpackPrefetch: true */ '@/views/components/Current'),
		Day: () => import(/* webpackPrefetch: true */ '@/views/components/Day'),
		Search: () => import(/* webpackPrefetch: true */ '@/views/components/Search'),
		Carousel,
		Slide
	},
	data () {
		return {
			location: {},
			loading: true,
			ready: false,
			weatherCurrent: {},
			weatherForecast: []
		}
	},
	computed: {
        ...mapState(['favorites'])
	},
	watch: {
		'settings.config.units' () {
			this.getWeatherData()
		},
		'$route.params.id' () {
			this.getUserLocation()
		}
	},
	created () {
		if (this.$route.params.id) {
			this.location = this.favorites.find(item => item.id === this.$route.params.id)
			this.getWeatherData()
		} else {
			this.getUserLocation()
		}
	},
	mounted () {
		EventBus.$on('submit-search', (key) => this.searchLocation(key))
	},
	destroyed () {
		EventBus.$off('submit-search')
    },
	methods: {
		getUserLocation() {

			if (!navigator.geolocation || !navigator.permissions || !navigator.permissions.query) {
				this.startGettingData('appDefault')
				return
			}

			if (this.objectLength(this.settings.locations.userDefault) > 0) {
				this.startGettingData('userDefault')
			} else {
				navigator.permissions.query({ name: 'geolocation' }).then((result) => {
					if (result.state === 'denied') {
						this.startGettingData('appDefault')
					} else {
						navigator.geolocation.getCurrentPosition(location => {
							this.getLocationData(location.coords.latitude, location.coords.longitude)
						}, null,
						{
							timeout: 5000,
							maximumAge: 3600
						})
					}
				})
			}

		},
		getLocationData (longitude, latitude) {
			axiosGetLocationData(longitude, latitude).then(response => {
				this.location = response
				this.$store.dispatch('setUserDefaultLocation', this.location)
				this.startGettingData('userDefault')
			})
			.catch(() => {
				this.startGettingData('appDefault')
				this.displayMessage('There was an error while retrieving data for your location. Displaying data for a default location.', 'error')
			})
		},
		searchLocation (key) {
			axiosSearchLocation(key).then(response => {
				this.$store.dispatch('setCustomLocation', response)
				this.startGettingData('customLocation')
			})
			.catch(() => {
				this.displayMessage('There was an error while searching.', 'error')
			})
		},
		getWeatherData () {
			this.loading = true
			const useMetrics = this.settings.config.units === 'metrics'
			axiosGetWeatherData(this.location.id, useMetrics).then(resp => {
				this.weatherCurrent = resp.weatherCurrent
				this.weatherForecast = resp.weatherForecast
				this.ready = true
				this.loading = false
			})
			.catch(() => {
				setTimeout(() => {
					this.ready = true
					this.errorData = true
					this.loading = false
				}, 300)
			})
		},
		startGettingData (source) {
			this.location = this.cloneObject(this.settings.locations[source])
			this.getWeatherData()
		}
	}
}
</script>

<style lang="scss" scoped>
.current {

	&-location {

		&-forecast {
			margin: 0 -15px;
		}

	}

}
</style>
