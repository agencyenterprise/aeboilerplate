import { handleActions } from 'redux-actions'
import { createActionThunk } from 'redux-thunk-actions'

import { getMeData } from '../../api/me/get-me'

export const initialState = {
  me: {},
  loading: false,
  error: null,
}

export const getMe = createActionThunk('GET_ME', () => getMeData())

export const me = handleActions(
  {
    [getMe.STARTED]: (state) => ({
      ...state,
      loading: true,
    }),
    [getMe.SUCCEEDED]: (state, action) => ({
      ...state,
      me: action.payload.me,
    }),
    [getMe.FAILED]: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload.error,
    }),
    [getMe.ENDED]: (state) => ({
      ...state,
      loading: false,
    }),
  },
  initialState,
)
