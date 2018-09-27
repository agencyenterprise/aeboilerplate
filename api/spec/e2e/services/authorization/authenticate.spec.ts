import { authenticate } from '../../../../src/services/authentication/authenticate'
import { authenticationInfoFixture } from '../../../fixtures/authentication-info'
import { clearTestData, db } from '../../../spec-helper'

describe('authentication service', () => {
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

    expect(authTokenBeforeAuth).toBeUndefined()
    expect(userBeforeAuth).toBeUndefined()

    await authenticate(authenticationInfoFixture)

    const authTokenAfterAuth = await getAuthTokenByToken(authenticationInfoFixture.token)
    const userAfterAuth = await getUserByEmail(userEmail)

    expect(authTokenAfterAuth.token).toEqual(authenticationInfoFixture.token)
    expect(userAfterAuth.email).toEqual(userEmail)
  })

  it('saves two tokens and one user when authenticating the same user twice', async () => {
    await authenticate(authenticationInfoFixture)
    await authenticate(authenticationInfoFixture)

    const savedAuthTokens = await db('auth_tokens')
      .select('token')
      .where({ token: authenticationInfoFixture.token })

    const userEmail = authenticationInfoFixture.profile.emails[0].value
    const savedUsers = await db('users')
      .select('email')
      .where({ email: userEmail })

    expect(savedAuthTokens).toHaveLength(2)
    expect(savedUsers).toHaveLength(1)
  })
})
