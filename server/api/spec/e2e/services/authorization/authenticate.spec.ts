import { db, expect, clearTestData } from '../../../spec-helper'
import { authenticationInfoFixture } from '../../../fixtures/authentication-info'
import { authenticate } from '../../../../src/services/authentication/authenticate'

describe('authenticate profile', () => {
  afterEach(async () => {
    await clearTestData()
  })

  it('saves the authenticated user and auth token', async () => {
    const getAuthTokenByToken = async (token) =>
      db('auth_tokens')
        .select('token')
        .where({ token })
        .first()

    const getUserByEmail = async (email) =>
      db('users')
        .select('email')
        .where({ email })
        .first()

    const userEmail = authenticationInfoFixture.profile.emails[0].value

    const authTokenBeforeAuth = await getAuthTokenByToken(authenticationInfoFixture.token)
    const userBeforeAuth = await getUserByEmail(userEmail)

    expect(authTokenBeforeAuth).to.be.undefined
    expect(userBeforeAuth).to.be.undefined

    await authenticate(authenticationInfoFixture)

    const authTokenAfterAuth = await getAuthTokenByToken(authenticationInfoFixture.token)
    const userAfterAuth = await getUserByEmail(userEmail)

    expect(authTokenAfterAuth.token).to.be.eql(authenticationInfoFixture.token)
    expect(userAfterAuth.email).to.be.eql(userEmail)
  })
})
