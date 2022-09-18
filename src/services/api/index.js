import axios from 'axios'
import { cacheAdapterEnhancer } from 'axios-extensions'
import config from '@/config'

export const http = axios.create({
	baseURL: config.endpoint,
	adapter: cacheAdapterEnhancer(axios.defaults.adapter)
})
