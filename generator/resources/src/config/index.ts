export const config = {
  apiUrl: process.env.REACT_APP_API_URL || '/api',
  localStorageKeys: {
    token: 'token',
  },
  auth: {
    googleAuthURL: process.env.REACT_APP_GOOGLE_AUTH_URL || '/api/auth/google',
    linkedInAuthURL: process.env.REACT_APP_LINKEDIN_AUTH_URL || '/api/auth/linkedin',
  },
}
