import axios from 'axios'
import { http } from '@/services/api/index'
import locationWeather from '@/services/mixins/locationWeather'
import cloneObject from '@/services/mixins/cloneObject'

export const axiosGetLocationData = (longitude, latitude) => {
    return http.get(`/locations/v1/cities/geoposition/search/?q=${longitude},${latitude}&apikey=${process.env.VUE_APP_ACCUWEATHER_KEY}`)
        .then(response => {
            return Promise.resolve( locationWeather.methods.locationMapper(response.data))
        })
}

export const axiosGetWeatherData = (locationId, useMetrics) => {
    const endpoints = [
        `/currentconditions/v1/${locationId}?apikey=${process.env.VUE_APP_ACCUWEATHER_KEY}`,
        `/forecasts/v1/daily/5day/${locationId}?metric=${useMetrics}&apikey=${process.env.VUE_APP_ACCUWEATHER_KEY}`
    ]
    return axios.all(endpoints.map((promise) => http.get(promise))).then(
        axios.spread((current, forecast) => {
            return Promise.resolve({
                weatherCurrent: locationWeather.methods.locationWeather(current.data[0]),
                weatherForecast: forecast.data.DailyForecasts
            })
        })
    )
}

export const axiosSearchLocation = (key) => {
    return http.get(`/locations/v1/${key}?apikey=${process.env.VUE_APP_ACCUWEATHER_KEY}`)
        .then(response => {
            return Promise.resolve( locationWeather.methods.locationMapper(response.data))
        })
}

export const axiosGetFavoritesWeather = (list) => {
    const locationsList = cloneObject.methods.cloneObject(list)
    const endpoints = locationsList.map(item =>
        http.get(`/currentconditions/v1/${item.id}?apikey=${process.env.VUE_APP_ACCUWEATHER_KEY}`)
    )
    return axios.all(endpoints)
        .then(results => {
            results.forEach((element, index) => {
                locationsList[index].weather = locationWeather.methods.locationWeather(element.data[0])
            })
            return Promise.resolve(locationsList)
        })
}
