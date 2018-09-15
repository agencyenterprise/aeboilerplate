import { createAction, handleActions } from 'redux-actions'
import { getMeData } from '../../api/me/get-me'

const defaultState = {
  me: {},
  loading: false,
  error: null,
}

export const fetchMeRequest = createAction('FETCH_ME_REQUEST')
export const fetchMeSuccess = createAction('FETCH_ME_SUCCESS')
export const fetchMeFailure = createAction('FETCH_ME_FAILURE')

export const fetchMe = handleActions(
  {
    [fetchMeRequest]: (state) => ({
      ...state,
      loading: true,
    }),
    [fetchMeSuccess]: (state, action) => ({
      ...state,
      loading: false,
      me: action.payload.me,
    }),
    [fetchMeFailure]: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload.error,
    }),
  },

  defaultState,
)

export const getMe = () => {
  return async () => {
    fetchMeRequest()
    try {
      const me = await getMeData()

      fetchMeSuccess({ me })
    } catch (error) {
      fetchMeFailure({ error })
    }
  }
}
