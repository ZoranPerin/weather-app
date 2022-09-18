export default {
	methods: {
		locationWeather (object) {
			return {
				isDay: object.IsDayTime,
				icon: object.WeatherIcon,
				text: object.WeatherText,
				temperature: {
					imperial: Math.floor(object.Temperature.Imperial.Value),
					metrics: Math.floor(object.Temperature.Metric.Value)
				},
				unit: {
					imperial: object.Temperature.Imperial.Unit,
					metrics: object.Temperature.Metric.Unit
				}
			}
		},
		locationMapper (object) {
			return {
				id: object.Key,
				name: object.LocalizedName,
				country: object.Country.EnglishName
			}
		}
	}
}
