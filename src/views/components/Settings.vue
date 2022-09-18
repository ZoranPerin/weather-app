<template>
	<el-dialog
		title="Settings"
		:visible.sync="showSettingsDialog"
		:show-close="false"
		:close-on-press-escape="false"
		:close-on-click-modal="false"
		width="400px"
	>
		<div class="row middle margin-bottom-20">
			<div class="col-lg-4">
				<label>
					Theme:
				</label>
			</div>
			<div class="col-lg-8">
				<el-select
					v-model="tempSettings.theme"
					placeholder="Select"
				>
					<el-option
						v-for="theme in $config.availableThemes"
						:key="theme.id"
						:label="theme.label"
						:value="theme.id"
					/>
				</el-select>
			</div>
		</div>
		<div class="row middle margin-bottom-30">
			<div class="col-lg-4">
				<label>
					Units:
				</label>
			</div>
			<div class="col-lg-8">
				<el-select
					v-model="tempSettings.units"
					placeholder="Select"
				>
					<el-option
						v-for="unit in $config.availableUnits"
						:key="unit.id"
						:label="unit.label"
						:value="unit.id"
					/>
				</el-select>
			</div>
		</div>
		<div class="row">
			<div class="col-lg-12 align-right">
				<el-button
					@click="saveSettings()"
					:loading="processing"
					type="primary"
					native-type="submit"
					:plain="settings.config.theme !== 'dark'"
				>
					Save settings
				</el-button>
				<el-button
					@click="closeDialog()"
					:plain="settings.config.theme !== 'dark'"
				>
					Cancel
				</el-button>
			</div>
		</div>
	</el-dialog>
</template>

<script>
import { mapState } from 'vuex'
import cloneObject from '@/services/mixins/cloneObject'

export default {
	name: 'Settings',
	mixins: [
		cloneObject
	],
	data () {
		return {
			processing: false,
			tempSettings: {}
		}
	},
	computed: {
        ...mapState(['showSettingsDialog'])
	},
	watch: {
		'showSettingsDialog' () {
			this.tempSettings = this.cloneObject(this.settings.config)
		}
	},
	methods: {
		saveSettings () {
			this.processing = true
			this.$store.dispatch('updateConfig', this.tempSettings).then(() => {
				setTimeout (() => {
					this.closeDialog()
					this.displayMessage('Your settings are successfully saved', 'success')
				}, 300)
			})

		},
		closeDialog () {
			this.processing = false
			this.$store.dispatch('setShowSettingsDialog', false)
		}
	}
}
</script>

<style lang="scss" scoped>
label {

	display: block;
	text-align: right;

	.dark-mode & {
		color: darken($color-text-dark, 20%);
	}

	@include breakpoint(sm) {
		margin-bottom: 5px;
		text-align: left;
	}

}
</style>
