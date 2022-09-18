export default {
	methods: {
		displayMessage (message, type) {
			this.$notify({
				title: type === 'error' ? 'Error!' : 'Success!',
				message: message,
				type: type,
				duration: 2000,
				customClass: type,
				position: 'bottom-right'
			})
		}
	}
}
