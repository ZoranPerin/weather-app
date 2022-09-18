<template>
	<div class="box search">
		<div class="row">
			<div class="col-lg-9">
				<el-select
					v-model="input"
					:remote-method="submitSearch"
					:loading="loading"
					@clear="clearOptions"
					filterable
					clearable
					remote
					placeholder="Please enter a location"
				>
					<el-option
						v-for="item in options"
						:key="item.Key"
						:label="`${item.LocalizedName}, (${item.Country.LocalizedName})`"
						:value="item.Key"
					/>
				</el-select>
			</div>
			<div class="col-lg-3">
				<el-button
					@click="searchWeather()"
					:type="input ? 'primary' : 'info'"
					:plain="settings.config.theme !== 'dark'"
					:disabled="!input"
					class="wide search-button"
				>
					Search
				</el-button>
			</div>
		</div>
	</div>
</template>

<script>
import { http } from '@/services/api'
import { EventBus } from '@/services/event-bus'

export default {
	name: 'Search',
	data () {
		return {
			input: null,
			list: [],
			loading: false,
			options: [],
			searchResults: [],
			value: []
		}
	},
	methods: {
		submitSearch (value) {
			if (value.length > 2) {
				this.loading = true
				http.get(`/locations/v1/cities/autocomplete/?q=${value}&apikey=${process.env.VUE_APP_ACCUWEATHER_KEY}`)
				.then(response => {
					this.options = response.data
					this.loading = false
				})
				.catch(() => {
					this.loading = false
					this.displayMessage('There was an error while retrieving search data.', 'error')
				})
			}
		},
		clearOptions () {
			this.options = []
			this.list = []
		},
		searchWeather () {
			EventBus.$emit('submit-search', this.input)
		}
	}
}
</script>

<style lang="scss" scoped>
.search {

	margin-bottom: 50px;
	padding: 20px;

	@include breakpoint(sm) {
		margin-bottom: 30px;
	}

	&-button {

		@include breakpoint(xs) {
			margin-top: 20px;
		}

	}

}
</style>
