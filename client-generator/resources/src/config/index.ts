const configuration = {
  apiUrl: process.env.API_URL,
  localStorageKeys: {
    token: 'token',
  },
  auth: {
    linkedInAuthURL: process.env.LINKEDIN_AUTH_URL,
  },
}

export default configuration
