import * as React from 'react'

import { config } from '../../config'

import './login.scss'

const Login = () => (
  <div className="login">
    <a href={config.auth.googleAuthURL}>
      <button>Login with Google</button>
    </a>
  </div>
)

export { Login }
