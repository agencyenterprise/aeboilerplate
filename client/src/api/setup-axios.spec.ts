import axios from 'axios'

import { config } from '../config'
import { setupAxios } from './setup-axios'

describe('setup axios', () => {
  setupAxios()

  it('sets axios base url accordingly to config file', () => {
    expect(axios.defaults.baseURL).toEqual(config.apiUrl)
  })
})
