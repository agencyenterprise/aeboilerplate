import * as React from 'react'
import { Switch } from 'react-router-dom'

import { ProtectedRoute } from './ProtectedRoute'
import { PublicRoute } from './PublicRoute'
import { Connect } from './connect/Connect'
import { Login } from './connect/Login'
import { Home } from './home/Home'
import { routePaths } from './route-paths'
import { User } from './user/User'

const Routes = () => {
  return (
    <Switch>
      <PublicRoute exact path={routePaths.root} component={Home} />
      <PublicRoute exact path={routePaths.login} component={Login} />
      <PublicRoute exact path={routePaths.connect} component={Connect} />
      <ProtectedRoute exact path={routePaths.private.root} component={User} />
    </Switch>
  )
}

export { Routes }
