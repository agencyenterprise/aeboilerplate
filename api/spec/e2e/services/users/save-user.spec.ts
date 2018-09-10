import { saveUser } from '../../../../src/services/users/save-user'
import { userFixture } from '../../../fixtures/user'
import { clearTestData, db } from '../../../spec-helper'

describe('user service', () => {
  afterEach(async () => {
    await clearTestData()
  })

  it('saves an user', async () => {
    const beforeSave = await db('users')
      .select('email')
      .where({ email: userFixture.email })
      .first()

    expect(beforeSave).toBeUndefined()

    await saveUser(userFixture)

    const { email } = await db('users')
      .select('email')
      .where({ email: userFixture.email })
      .first()

    expect(email).toEqual(userFixture.email)
  })

  it('returns the saved user id', async () => {
    const savedUserId = await saveUser(userFixture)

    expect(savedUserId).toEqual(1)
  })
})
