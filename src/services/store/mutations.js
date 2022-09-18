export default {
	UPDATE_SETTINGS (state, payload) {
		state.settings = payload
		window.localStorage.setItem('WEATHER_APP_SETTINGS', JSON.stringify(state.settings))
	},
	UPDATE_CONFIG (state, payload) {
		state.settings.config = payload
		window.localStorage.setItem('WEATHER_APP_SETTINGS', JSON.stringify(state.settings))
	},
	SET_USER_DEFAULT_LOCATION (state, payload) {
		state.settings.locations.userDefault = payload
		window.localStorage.setItem('WEATHER_APP_SETTINGS', JSON.stringify(state.settings))
	},
	SET_APP_DEFAULT_LOCATION (state, payload) {
		state.settings.locations.appDefault = payload
		window.localStorage.setItem('WEATHER_APP_SETTINGS', JSON.stringify(state.settings))
	},
	SET_CUSTOM_LOCATION (state, payload) {
		state.settings.locations.customLocation = payload
		window.localStorage.setItem('WEATHER_APP_SETTINGS', JSON.stringify(state.settings))
	},
	SET_SHOW_SETTINGS_DIALOG (state, payload) {
		state.showSettingsDialog = payload
	},
	SET_FAVORITES (state, payload) {
		state.favorites = payload
		window.localStorage.setItem('WEATHER_APP_DATA', JSON.stringify(payload))
	},
	REMOVE_DATA (state) {
		state.favorites = []
		state.settings.locations.userDefault = {}
		window.localStorage.removeItem('WEATHER_APP_DATA')
		window.localStorage.removeItem('WEATHER_APP_SETTINGS')
		window.location.href = '/main'
	}
}
