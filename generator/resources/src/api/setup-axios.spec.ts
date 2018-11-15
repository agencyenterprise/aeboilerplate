import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import { config } from '../config'
import { setupAxios } from './setup-axios'

jest.mock('store')
jest.mock('../config')

describe('setup axios', () => {
  setupAxios()

  let httpMock

  beforeEach(() => {
    httpMock = new MockAdapter(axios)
  })

  it('sets axios base url accordingly to config file', () => {
    expect(axios.defaults.baseURL).toEqual(config.apiUrl)
  })

  it('returns response in case of success calling an api route', async () => {
    const expectedResponse = { response: 'SUCCESS' }

    httpMock.onGet('/test').reply(200, expectedResponse)

    const { data } = await axios({
      method: 'get',
      url: '/test',
    })

    expect(data).toEqual(expectedResponse)
  })

  it('clears store when receiving an unauthorized status', async () => {
    httpMock.onGet('/test').reply(401)

    await axios({
      method: 'get',
      url: '/test',
    }).catch((error) => {
      expect(error.response.status).toEqual(401)
      expect(require('store').clearAll).toBeCalled()
    })
  })

  it('returns error when receiving an error status', async () => {
    httpMock.onGet('/test').reply(500)

    axios.interceptors.request.use((axiosConfig) => {
      expect(axiosConfig.url).toEqual('/test')

      return axiosConfig
    })

    await axios({
      method: 'get',
      url: '/test',
    }).catch((error) => {
      expect(error.response.status).toEqual(500)
    })
  })
})
