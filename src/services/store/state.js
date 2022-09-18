import config from '@/config'

export default {
	favorites: [],
	settings: {
		config: config.defaultConfig,
		locations: {
			appDefault: config.defaultLocation,
			userDefault: {},
			customLocation: {}
		}
	},
	showSettingsDialog: false
}
