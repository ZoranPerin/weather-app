const config = {
	endpoint: 'https://dataservice.accuweather.com',
	defaultConfig: {
		theme: 'dark',
		units: 'metrics'
	},
	defaultLocation: {
		id: '215854',
		name: 'Tel Aviv',
		country: 'Israel'
	},
	availableThemes: [
		{
			id: 'light',
			label: 'Light'
		},
		{
			id: 'dark',
			label: 'Dark'
		}
	],
	availableUnits: [
		{
			id: 'metrics',
			label: 'Celsius'
		},
		{
			id: 'imperial',
			label: 'Fahrenheit'
		}
	]
}

export default config
