import axios from 'axios'
import * as qs from 'qs'
import * as store from 'store'

import { config } from '../config'

export const setupAxios = () => {
  const paramsSerializer = (params: any) => qs.stringify(params, { arrayFormat: 'brackets' })

  axios.defaults.baseURL = config.apiUrl || '/api/'

  axios.interceptors.request.use((axiosConfig) => {
    axiosConfig.url = `${axios.defaults.baseURL}${axiosConfig.url}`
    axiosConfig.timeout = 200000
    axiosConfig.headers.authorization = store.get(config.localStorageKeys.token)
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
