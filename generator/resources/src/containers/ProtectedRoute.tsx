import * as React from 'react'
import { Redirect, Route } from 'react-router-dom'
import * as store from 'store'

import { config } from '../config'
import { routePaths } from './route-paths'

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn = !!store.get(config.localStorageKeys.token)
  const redirectComponent = <Redirect to={{ pathname: routePaths.login }} />

  const renderComponent = (props) => (
    <main>
      <Component {...props} />
    </main>
  )

  return <Route {...rest} render={(props) => (isLoggedIn ? renderComponent(props) : redirectComponent)} />
}
