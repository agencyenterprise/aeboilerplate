import clone from 'lodash.clone'

import { saveAuthToken } from '../../../../src/services/tokens/save-auth-token'
import { saveUser } from '../../../../src/services/users/save-user'
import { authTokenFixture } from '../../../fixtures/auth-token'
import { userFixture } from '../../../fixtures/user'
import { apiRequest, clearTestData } from '../../../spec-helper'

describe('get me', () => {
  afterEach(async () => {
    await clearTestData()
  })

  it('returns unauthorized status when not passing an authorized token', async () => {
    const { status } = await apiRequest.get('/api/me')

    expect(status).toEqual(401)
  })

  it('returns unauthorized status when passing an inactive token', async () => {
    const inactiveToken = clone(authTokenFixture)
    inactiveToken.status = 'deleted'

    await saveAuthToken(authTokenFixture)

    const { status } = await apiRequest.get('/api/me')

    expect(status).toEqual(401)
  })

  it('returns success status when passing an authorized token', async () => {
    await saveAuthToken(authTokenFixture)
    await saveUser(userFixture)

    const { status } = await apiRequest.get('/api/me').set('Authorization', authTokenFixture.token)

    expect(status).toEqual(200)
  })
})
