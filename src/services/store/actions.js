export default {
	setShowSettingsDialog (context, payload) {
		context.commit('SET_SHOW_SETTINGS_DIALOG', payload)
	},
	updateConfig (context, payload) {
		context.commit('UPDATE_CONFIG', payload)
	},
	updateSettings (context, payload) {
		context.commit('UPDATE_SETTINGS', payload)
	},
	setUserDefaultLocation (context, payload) {
		context.commit('SET_USER_DEFAULT_LOCATION', payload)
	},
	setAppDefaultLocation (context, payload) {
		context.commit('SET_APP_DEFAULT_LOCATION', payload)
	},
	setCustomLocation (context, payload) {
		context.commit('SET_CUSTOM_LOCATION', payload)
	},
	setFavorites (context, payload) {
		context.commit('SET_FAVORITES', payload)
	},
	removeUserData(context, payload) {
		context.commit('REMOVE_DATA', payload)
	}
}
