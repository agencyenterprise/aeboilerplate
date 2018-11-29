import * as React from 'react'

import { config } from '../../config'

import './login.scss'

const Login = () => (
  <div className="login">
    <p>Sign in with:</p>
    <a href={config.authUrl.google}>
      <button>Google</button>
    </a>
    <a href={config.authUrl.facebook}>
      <button>Facebook</button>
    </a>
    <a href={config.authUrl.linkedIn}>
      <button>LinkedIn</button>
    </a>
  </div>
)

export { Login }
