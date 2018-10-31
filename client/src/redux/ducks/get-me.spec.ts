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

  describe('get', () => {
    it('returns me payload when calling the action', async () => {
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

    it('returns error payload and sets me equals to empty object when receiving 400', async () => {
      httpMock.onGet('/me').reply(400, {
        payload: { error: 'OPS' },
      })

      try {
        await getMe()(store.dispatch)
      } catch (e) {}
      const executedActions = store.getActions()
      const failedPayload = executedActions.find((action) => action.type === getMe.FAILED)
      expect(executedActions.map((action) => action.type)).toEqual([getMe.START, getMe.FAILED, getMe.ENDED])
      expect(failedPayload).toEqual({
        error: { error: 'OPS' },
        type: 'GET_ME_FAILED',
      })
    })

    describe('reducers', () => {
      let startedState = { me: {}, loading: true, error: null }
      let succeededState = { me: { name: 'Krei' }, loading: true, error: null }

      it('activates loading on start reducer', async () => {
        const startReducer = me(initialState, { type: getMe.START })

        expect(startReducer).toEqual(startedState)
      })

      it('adds me data to the reducer when succeeded', async () => {
        const succeededReducer = me(startedState, { type: getMe.SUCCEEDED, payload: { me: { name: 'Krei' } } })

        expect(succeededReducer).toEqual(succeededState)
      })

      it('sets loading equals to false when the process ends', async () => {
        const succeededReducer = me(succeededState, { type: getMe.ENDED, payload: { me: { name: 'Krei' } } })

        expect(succeededReducer).toEqual({ me: { name: 'Krei' }, loading: false, error: null })
      })
    })
  })
})
