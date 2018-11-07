import axios from 'axios'
import * as qs from 'qs'
import * as store from 'store'

import { config } from '../config'
import { routePaths } from '../containers/route-paths'

export const setupAxios = () => {
  const paramsSerializer = (params: any) => qs.stringify(params, { arrayFormat: 'brackets' })

  axios.defaults.baseURL = config.apiUrl

  axios.interceptors.request.use((axiosConfig) => {
    const axiosUrl = config.apiUrl === '/api' ? axiosConfig.url : `${axios.defaults.baseURL}${axiosConfig.url}`
    axiosConfig.url = axiosUrl
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
      if (error.response.status === 401) {
        store.clearAll()
        window.location.href = routePaths.root
      }

      return Promise.reject(error)
    },
  )
}
