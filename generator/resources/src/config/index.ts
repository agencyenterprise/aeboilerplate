export const config = {
  apiUrl: process.env.REACT_APP_API_URL || '/api',
  localStorageKeys: {
    token: 'token',
  },
  authUrl: {
    google: process.env.REACT_APP_GOOGLE_AUTH_URL || '/api/auth/google',
    linkedIn: process.env.REACT_APP_LINKEDIN_AUTH_URL || '/api/auth/linkedin',
    facebook: process.env.REACT_APP_FACEBOOK_AUTH_URL || '/api/auth/facebook',
  },
}
