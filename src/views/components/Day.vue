<template>
	<div class="box">
		<div class="card-day">
			{{ dateToDay(item.Date) }}
		</div>
		<div class="card-date">
			{{ dateFormat(item.Date) }}
		</div>
		<div class="card-icon">
			<img :src="getImage(item.Day.Icon)" />
		</div>
		<div class="card-temperature">
			Max: <span>{{ Math.floor(item.Temperature.Maximum.Value) }}°{{ item.Temperature.Maximum.Unit }}</span>
		</div>
		<div class="card-temperature">
			Min: <span>{{ Math.floor(item.Temperature.Minimum.Value) }}°{{ item.Temperature.Minimum.Unit }}</span>
		</div>
	</div>
</template>

<script>
import getImage from '@/services/mixins/getImage'

export default {
	name: 'Day',
	mixins: [
		getImage
	],
	props: {
		current: Object,
		item: Object
	},
	methods: {
		dateToDay (date) {
			return new Date(date).toLocaleString('en-us', { weekday: 'long' })
		},
		dateFormat (date) {
			let options = {
				year: 'numeric',
				month: '2-digit',
				day: 'numeric'
			}
			return new Date(date).toLocaleString('en-us', options)
		}
	}
}
</script>

<style lang="scss" scoped>
.card {

	&-day {
		font-size: 16px;
		font-weight: $font-weight-semibold;
	}

	&-date {

		color: lighten($color-text-light, 20%);
		font-size: 13px;

		.dark-mode & {
			color: darken($color-text-dark, 40%);
		}

	}

	&-temperature {

		font-size: 16px;

		span {
			font-weight: $font-weight-semibold;
		}

	}

	&-icon {

		height: 40px;
		margin: 15px 0;

		img {
			display: inline-block;
			height: 40px;
		}

	}

}
</style>
