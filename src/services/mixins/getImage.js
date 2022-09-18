import addLeadingZero from '@/services/mixins/addLeadingZero'

export default {
	mixins: [
		addLeadingZero
	],
	methods: {
		getImage (value) {
			return `https://developer.accuweather.com/sites/default/files/${this.addLeadingZero(value)}-s.png`
		}
	}
}
