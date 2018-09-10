import { saveAuthToken } from '../../../src/services/tokens/save-auth-token'
import { authTokenFixture } from '../../fixtures/auth-token'
import { apiRequest } from '../../spec-helper'

describe('root route get', () => {
  it('returns unauthorized status when not passing an authorized token', async () => {
    const { status } = await apiRequest.get('/')

    expect(status).toEqual(401)
  })

  it('returns success status when passing an authorized token', async () => {
    await saveAuthToken(authTokenFixture)

    const { status } = await apiRequest.get('/').set('Authorization', authTokenFixture.token)

    expect(status).toEqual(200)
  })
})
