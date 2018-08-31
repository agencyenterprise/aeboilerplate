import { db, expect, clearTestData } from '../../../spec-helper'
import { authTokenFixture } from '../../../fixtures/auth-token'
import { saveAuthToken } from '../../../../src/services/tokens/save-auth-token'

describe('save token service', () => {
  afterEach(async () => {
    await clearTestData()
  })

  it('saves a auth token', async () => {
    const beforeSave = await db('auth_tokens')
      .select('token')
      .where({ token: authTokenFixture.token })
      .first()

    expect(beforeSave).to.be.undefined

    await saveAuthToken(authTokenFixture)

    const { token } = await db('auth_tokens')
      .select('token')
      .where({ token: authTokenFixture.token })
      .first()

    expect(token).to.be.eql(authTokenFixture.token)
  })
})
