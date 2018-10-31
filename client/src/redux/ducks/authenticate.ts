import { createAction, handleActions } from 'redux-actions'

const defaultState = {
  token: '',
  authenticated: false,
}

export const authenticateAction = createAction('AUTHENTICATE')

export const authentication = handleActions(
  {
    [authenticateAction](state, action) {
      return { ...state, token: action.payload.token, authenticated: true }
    },
  },
  defaultState,
)

export const authenticate = (token: string) => {
  return authenticateAction({ token })
}
