const AUTHENTICATE_REQUEST = 'AUTHENTICATE_REQUEST'
const AUTHENTICATE_SUCCESS = 'AUTHENTICATE_SUCCESS'
const AUTHENTICATE_FAILURE = 'AUTHENTICATE_FAILURE'

const initialState = {
  token: {
    accessToken: '',
  },
  authenticated: false,
  loading: false,
  error: null,
}

export default function reducer(state = initialState, action: any) {
  switch (action.type) {
    case AUTHENTICATE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case AUTHENTICATE_SUCCESS:
      return {
        ...state,
        loading: false,
        token: {
          accessToken: action.payload.accessToken,
        },
        authenticated: true,
      }
    case AUTHENTICATE_FAILURE:
      return {
        ...initialState,
        error: action.payload.error,
      }

    default:
      return state
  }
}

export function authenticate(token: string) {
  return { type: AUTHENTICATE_SUCCESS, payload: { accessToken: token } }
}
