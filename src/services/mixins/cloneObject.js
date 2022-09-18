export default {
	methods: {
		cloneObject (element) {
			return JSON.parse(JSON.stringify(element))
		}
	}
}
