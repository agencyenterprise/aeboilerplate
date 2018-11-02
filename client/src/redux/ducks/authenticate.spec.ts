import { authenticate, authentication, initialState } from './authenticate'

describe('authenticate duck', () => {
  it('creates an action to authenticate', () => {
    const authenticateAction = authenticate('TOKEN_HERE')

    expect(authenticateAction).toEqual({ type: 'AUTHENTICATE', payload: { token: 'TOKEN_HERE' } })
  })

  describe('reducer', () => {
    let startedState = { authenticated: true, token: 'TOKEN_HERE' }

    it('adds token and sets authenticated flag to the current state', async () => {
      const startReducer = authentication(initialState, { type: 'AUTHENTICATE', payload: { token: 'TOKEN_HERE' } })

      expect(startReducer).toEqual(startedState)
    })
  })
})
