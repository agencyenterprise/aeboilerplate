import clone from 'lodash.clone'

import { saveAuthToken } from '../../../src/services/tokens/save-auth-token'
import { authTokenFixture } from '../../fixtures/auth-token'
import { apiRequest, clearTestData } from '../../spec-helper'

describe('root route get', () => {
  afterEach(async () => {
    await clearTestData()
  })

  it('returns unauthorized status when not passing an authorized token', async () => {
    const { status } = await apiRequest.get('/api/')

    expect(status).toEqual(401)
  })

  it('returns unauthorized status when passing an inactive token', async () => {
    const inactiveToken = clone(authTokenFixture)
    inactiveToken.status = 'deleted'

    await saveAuthToken(authTokenFixture)

    const { status } = await apiRequest.get('/api/')

    expect(status).toEqual(401)
  })

  it('returns success status when passing an authorized token', async () => {
    await saveAuthToken(authTokenFixture)

    const { status } = await apiRequest.get('/api/').set('Authorization', authTokenFixture.token)

    expect(status).toEqual(200)
  })
})
