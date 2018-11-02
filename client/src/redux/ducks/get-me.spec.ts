import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'

import { getMe, initialState, me } from './get-me'

describe('me duck', () => {
  let store
  let httpMock

  beforeEach(() => {
    httpMock = new MockAdapter(axios)
    const mockStore = configureMockStore()
    store = mockStore(initialState)
  })

  describe('get me', () => {
    describe('calling the action', () => {
      it('returns "me" payload in case of success', async () => {
        httpMock.onGet('/me').reply(200, {
          me: { name: 'HELLO WORLD' },
        })

        await getMe()(store.dispatch)

        const executedActions = store.getActions()
        const succeededPayload = executedActions.find((action) => action.type === getMe.SUCCEEDED)

        expect(executedActions.map((action) => action.type)).toEqual([getMe.START, getMe.SUCCEEDED, getMe.ENDED])
        expect(succeededPayload).toEqual({
          type: getMe.SUCCEEDED,
          payload: { me: { name: 'HELLO WORLD' } },
        })
      })

      it('when receiving a bad request returns error payload', async () => {
        httpMock.onGet('/me').reply(400, {
          error: 'OPS',
        })

        await getMe()(store.dispatch)

        const executedActions = store.getActions()
        const failedPayload = executedActions.find((action) => action.type === getMe.FAILED)

        expect(executedActions.map((action) => action.type)).toEqual([getMe.START, getMe.FAILED, getMe.ENDED])
        expect(failedPayload).toEqual({
          type: getMe.FAILED,
          payload: { error: 'OPS' },
        })
      })
    })

    describe('reducer', () => {
      let startedState = { me: {}, loading: true, error: null }
      let succeededState = { me: { name: 'Krei' }, loading: true, error: null }

      it('activates loading on start reducer', async () => {
        const startReducer = me(initialState, { type: getMe.START })

        expect(startReducer).toEqual(startedState)
      })

      it('adds "me" data when it succeeds', async () => {
        const succeededReducer = me(startedState, { type: getMe.SUCCEEDED, payload: { me: { name: 'Krei' } } })

        expect(succeededReducer).toEqual(succeededState)
      })

      it('adds error data when it fails', async () => {
        const failedReducer = me(startedState, { type: getMe.FAILED, payload: { error: 'OPS' } })

        expect(failedReducer).toEqual({ error: 'OPS', loading: false, me: {} })
      })

      it('sets loading equals to false when it ends', async () => {
        const succeededReducer = me(succeededState, { type: getMe.ENDED, payload: { me: { name: 'Krei' } } })

        expect(succeededReducer).toEqual({ me: { name: 'Krei' }, loading: false, error: null })
      })
    })
  })
})
