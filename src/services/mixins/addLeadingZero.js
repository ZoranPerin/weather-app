export default {
	methods: {
		addLeadingZero (value) {
			return String(value).padStart(2, '0')
		}
	}
}
