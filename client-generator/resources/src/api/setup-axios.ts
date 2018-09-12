import axios from 'axios'
import * as platform from 'platform'
import * as qs from 'qs'
import * as store from 'store'

import { config } from '../config'

const REGEX_MICROSOFT = /Microsoft/i

export const setupAxios = () => {
  const paramsSerializer = (params: any) => qs.stringify(params, { arrayFormat: 'brackets' })

  axios.defaults.baseURL = config.apiUrl
  axios.interceptors.request.use((axiosConfig) => {
    axiosConfig.url = `${axios.defaults.baseURL}${axiosConfig.url}`
    axiosConfig.timeout = 200000
    axiosConfig.headers.authorization = store.get(config.localStorageKeys.token)

    if (platform.name === 'IE' || REGEX_MICROSOFT.test(platform.name || '')) {
      if (!axiosConfig.params) {
        axiosConfig.params = {}
      }
      axiosConfig.params.t = new Date().getTime()
    }

    axiosConfig.paramsSerializer = paramsSerializer

    return axiosConfig
  })

  axios.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      if (error.response.data.code === 401) {
        store.clearAll()
        window.location.href = '/'
      }

      return Promise.reject(error)
    },
  )
}
