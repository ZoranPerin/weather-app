<template>
	<div
		@click="openLocation(favorites[index].id)"
		class="box alt favorite"
		:class="favorites[index].weather.isDay ? 'is-day' : 'is-night'"
	>
		<div class="favorite-remove">
			<span
				@click="removeFromFavorites(favorites[index].id)"
				class="el-icon-delete"
			/>
		</div>
		<div class="favorite-place">
			{{ favorites[index].name }}
			<div class="favorite-place-country">
				{{ favorites[index].country }}
			</div>
		</div>
		<div class="favorite-icon">
			<img :src="getImage(favorites[index].weather.icon)" />
		</div>
		<div class="favorite-temperature">
			<span v-if="objectLength(favorites[index].weather)">
				{{ getTemperature(index) }}
			</span>
			<span v-else>
				N/A
			</span>
		</div>
		<div class="favorite-description">
			<span v-if="objectLength(favorites[index].weather)">
				{{ favorites[index].weather.text }}
			</span>
			<span v-else>
				N/A
			</span>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import cloneObject from '@/services/mixins/cloneObject'
import getImage from '@/services/mixins/getImage'
import objectLength from '@/services/mixins/objectLength'

export default {
	name: 'Favorite',
	mixins: [
		getImage,
		cloneObject,
		objectLength
	],
	props: {
		index: Number
	},
	computed: {
        ...mapState(['favorites'])
	},
	methods: {
		removeFromFavorites (id) {
			const filtered = this.cloneObject(this.favorites).filter(item => item.id !== id)
			this.$store.dispatch('setFavorites', filtered).then(() => {
				setTimeout (() => {
					this.displayMessage('Your location has been removed from favorites', 'success')
				}, 300)
			})
		},
		openLocation (id) {
			this.$router.push(`/main/${id}`)
		},
		getTemperature (index) {
			return `${this.favorites[index].weather.temperature[this.settings.config.units]}°${this.favorites[index].weather.unit[this.settings.config.units]}`
		}
	}
}
</script>

<style lang="scss" scoped>
.favorite {

	cursor: pointer;
	height: 100%;

	&:hover {
		transform: translateY(-5px);
	}

	&-place {

		font-size: 24px;
		font-weight: $font-weight-medium;
		line-height: 1.3;
		margin-bottom: 20px;

		&-country {

			color: lighten($color-text-light, 20%);
			font-size: 13px;
			margin-top: 10px;

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
		font-size: 38px;
		font-weight: $font-weight-semibold;
	}

	&-description {
		font-size: 16px;
	}

	&-remove {

		cursor: pointer;
		@include position($position: absolute, $top: 10px, $right: 16px);

		[class*='el-icon'] {
			font-size: 16px;
		}

	}

}
</style>
