import { get } from '../../api/get'

const FETCH_REQUEST = 'FETCH_REQUEST'
const FETCH_SUCCESS = 'FETCH_SUCCESS'
const FETCH_FAILURE = 'FETCH_FAILURE'

const initialState = {
  data: {},
  loading: false,
  error: null,
}

export default function reducer(state = initialState, action: any) {
  switch (action.type) {
    case FETCH_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
      }
    case FETCH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        data: {},
      }

    default:
      return state
  }
}

const fetchBegin = () => ({
  type: FETCH_REQUEST,
})

const fetchSuccess = (data: object) => ({
  type: FETCH_SUCCESS,
  payload: { data },
})

const fetchFailure = (error: object) => ({
  type: FETCH_FAILURE,
  payload: { error },
})

export function fetch() {
  return async (dispatch: any) => {
    dispatch(fetchBegin())

    try {
      const data = await get()

      return dispatch(fetchSuccess(data))
    } catch (error) {
      dispatch(fetchFailure(error))
    }
  }
}
