<template>
	<div
		v-loading="loading"
		class="main"
	>

		<div
			v-if="!loading"
			class="container"
		>

			<div v-if="errorData" class="row center">
				<div class="col-lg-8 col-md-10 col-sm-12">
					<div class="box no-hover">
						There was an error while communicating with API service. Please try later again!
					</div>
				</div>
			</div>

			<template v-else>

				<div class="row">
					<div class="col-lg-12">
						<h1>
							My favorite places {{ favorites.length ? `(${favorites.length})` : '' }}
						</h1>
					</div>
				</div>

				<div
					v-if="favorites.length === 0"
					class="row center"
				>
					<div class="col-lg-8 col-md-10 col-sm-12">
						<div class="box no-hover">
							There are no locations to display. Please add some on <router-link to="/main">Main page</router-link>
						</div>
					</div>
				</div>

				<template v-else>

					<div class="row stretch">
						<div
							v-for="(favorite, index) in favorites"
							:key="favorite.id"
							class="col-lg-3 col-md-4 col-sm-6 margin-bottom-30"
						>
							<Favorite :index="index"  />
						</div>
					</div>

					<div class="row">
						<div class="col-lg-12">
							<div class="forget">
								I'd like to <a href="#" @click.prevent="showDelete(true)">delete</a> my stored data. Thanx!
							</div>
						</div>
					</div>

				</template>

			</template>

		</div>

		<ConfirmDelete :show="showDeleteDialog" />

	</div>
</template>

<script>
import { mapState } from 'vuex'
import { EventBus } from '@/services/event-bus'
import { axiosGetFavoritesWeather } from '@/services/api/weather'

import cloneObject from '@/services/mixins/cloneObject'
import locationWeather from '@/services/mixins/locationWeather'
import objectLength from '@/services/mixins/objectLength'

export default {
	name: 'Favorites',
	metaInfo () {
		return {
			title: 'Favorites'
		}
	},
	mixins: [
		cloneObject,
		locationWeather,
		objectLength
	],
	components: {
		ConfirmDelete: () => import(/* webpackPrefetch: true */ '@/views/components/ConfirmDelete'),
		Favorite: () => import(/* webpackPrefetch: true */ '@/views/components/Favorite')
	},
	data () {
		return {
			errorData: false,
			loading: false,
			showDeleteDialog: false
		}
	},
	computed: {
        ...mapState(['favorites'])
	},
	created () {
		this.getData()
	},
	mounted () {
		EventBus.$on('delete-cancel', () => this.showDelete(false))
	},
	destroyed () {
		EventBus.$off('delete-cancel')
	},
	methods: {
		getData () {
			this.loading = true
			const list = this.favorites
			axiosGetFavoritesWeather(list).then( locations => {
				this.updateStorageData(locations)
			})
			.catch(() => {
				setTimeout (() => {
					this.errorData = true
					this.loading = false
				}, 300)
			})
		},
		updateStorageData (newFavorites) {
			this.$store.dispatch('setFavorites', newFavorites).then(() => {
				this.loading = false
				this.errorData = false
			})
		},
		showDelete (value) {
			this.showDeleteDialog = value
		}
	}
}
</script>

<style lang="scss" scoped>
.forget {

	color: lighten($color-text-light, 20%);
	font-size: 14px;
	text-align: center;

	.dark-mode & {
		color: darken($color-text-dark, 40%);
	}

}
</style>
