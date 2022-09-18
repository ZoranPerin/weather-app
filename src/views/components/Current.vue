<template>
	<div
		class="card box"
		:class="current.isDay ? 'is-day' : 'is-night'"
	>
		<div class="card-place">
			{{ location.name }}
			<div class="card-place-country">
				{{ location.country }}
			</div>
		</div>
		<div class="card-icon">
			<img :src="getImage(current.icon)" />
		</div>
		<div class="card-temperature">
			<span v-if="objectLength(current)">
				{{ getTemperature() }}
			</span>
			<span v-else>
				N/A
			</span>
		</div>
		<div class="card-description">
			<span v-if="objectLength(current)">
				{{ current.text }}
			</span>
			<span v-else>
				N/A
			</span>
		</div>
		<div
			@click="toggleFavorite()"
			class="card-favorite"
			:data-tooltip="isFavorite ? 'Remove from favorites' : 'Add to favorites'"
		>
			<span :class="isFavorite ? 'el-icon-star-on' : 'el-icon-star-off'" />
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import addLeadingZero from '@/services/mixins/addLeadingZero'
import cloneObject from '@/services/mixins/cloneObject'
import getImage from '@/services/mixins/getImage'
import objectLength from '@/services/mixins/objectLength'

export default {
	name: 'Current',
	mixins: [
		addLeadingZero,
		cloneObject,
		getImage,
		objectLength
	],
	props: {
		current: Object,
		location: Object
	},
	computed: {
        ...mapState(['favorites']),
		isFavorite () {
			return this.favorites.some(item => item.id === this.location.id)
		}
	},
	methods: {
		toggleFavorite () {
			let tempFavorites = this.cloneObject(this.favorites)
			let text
			if (tempFavorites.some(item => item.id === this.location.id)) {
				const index = tempFavorites.findIndex(item => item.id === this.location.id)
				tempFavorites.splice(index, 1)
				text = 'Your location has been removed from favorites'
			} else {
				tempFavorites.push({
					id: this.location.id,
					name: this.location.name,
					country: this.location.country,
					weather: this.current
				})
				text = 'Your location has been added to favorites'
			}
			this.$store.dispatch('setFavorites', tempFavorites).then(() => {
				setTimeout (() => {
					this.displayMessage(text, 'success')
				}, 300)
			})
		},
		getTemperature () {
			return `${this.current.temperature[this.settings.config.units]}°${this.current.unit[this.settings.config.units]}`
		}
	}
}
</script>

<style lang="scss" scoped>
.card {

	margin-bottom: 30px;

	&-favorite {
		cursor: pointer;
		font-size: 24px;
		@include position($position: absolute, $top: 20px, $right: 30px);
	}

	&-place {

		font-size: 32px;
		font-weight: $font-weight-medium;
		margin-bottom: 20px;

		&-country {

			color: lighten($color-text-light, 20%);
			font-size: 15px;

			.dark-mode & {
				color: darken($color-text-dark, 40%);
			}

		}

	}

	&-icon {

		height: 50px;

		img {
			display: inline-block;
			height: 50px;
		}

	}

	&-temperature {
		@include flex(flex, row, wrap, center, center);
		font-size: 42px;
		font-weight: $font-weight-semibold;
	}

	&-description {
		font-size: 16px;
	}

}
</style>
