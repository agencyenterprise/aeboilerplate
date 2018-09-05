import { db, clearTestData } from '../../../spec-helper'
import { authTokenFixture } from '../../../fixtures/auth-token'
import { saveAuthToken } from '../../../../src/services/tokens/save-auth-token'

describe('token service', () => {
  afterEach(async () => {
    await clearTestData()
  })

  it('saves the auth token', async () => {
    const beforeSave = await db('auth_tokens')
      .select('token')
      .where({ token: authTokenFixture.token })
      .first()

    expect(beforeSave).toBeUndefined()

    await saveAuthToken(authTokenFixture)

    const { token } = await db('auth_tokens')
      .select('token')
      .where({ token: authTokenFixture.token })
      .first()

    expect(token).toEqual(authTokenFixture.token)
  })
})
