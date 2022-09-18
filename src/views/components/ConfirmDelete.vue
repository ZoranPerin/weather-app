<template>
	<el-dialog
		title="Are you sure?"
		:visible.sync="show"
		:show-close="false"
		:close-on-press-escape="false"
		:close-on-click-modal="false"
		width="400px"
	>
		<div class="confirmation-text">
			This action will remove all your personal data related to Weather Application.
		</div>
		<div slot="footer" class="dialog-footer">
			<el-button
				@click="proceed()"
				:loading="processing"
				type="danger"
				:plain="settings.config.theme !== 'dark'"
			>
				Delete
			</el-button>
			<el-button
				@click="cancel()"
				:plain="settings.config.theme !== 'dark'"
			>
				Cancel
			</el-button>
		</div>
	</el-dialog>
</template>

<script>
import { EventBus } from '@/services/event-bus'

export default {
    name: 'ConfirmDelete',
	props: {
		show: Boolean
	},
	data () {
		return {
			processing: false
		}
	},
	methods: {
		cancel () {
			this.processing = false
			EventBus.$emit('delete-cancel')
		},
		proceed () {
			this.processing = true
			this.$store.dispatch('removeUserData').then(() => {
				setTimeout (() => this.processing = false, 200)
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.confirmation-text {

	.dark-mode & {
		color: darken($color-text-dark, 20%);
	}

}
</style>
