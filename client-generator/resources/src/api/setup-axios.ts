import axios from 'axios'
import * as platform from 'platform'
import * as qs from 'qs'
import * as store from 'store'

import config from '../config'

const REGEX_MICROSOFT = /Microsoft/i

export default function setupAxios() {
  const paramsSerializer = (params: any) => qs.stringify(params, { arrayFormat: 'brackets' })

  axios.interceptors.request.use((axiosConfig) => {
    // axiosConfig.url = `${config.apiUrl}${axiosConfig.url}`
    axiosConfig.url = config.apiUrl
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
}
