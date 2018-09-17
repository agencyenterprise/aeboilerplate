export const config = {
  apiUrl: process.env.REACT_APP_API_URL || '/api',
  localStorageKeys: {
    token: 'token',
  },
  auth: {
    linkedInAuthURL: process.env.REACT_APP_LINKEDIN_AUTH_URL || '/api/auth/linkedin',
  },
}
