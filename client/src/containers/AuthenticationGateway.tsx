import * as React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import * as store from 'store'

import { config } from '../config'
import { Connect } from './connect/Connect'
import { Home } from './home/Home'
import { routePaths } from './route-paths'

const AuthenticationGateway = ({ component: Component, path }: { component: any; path: string; location: any }) => {
  const componentRenderer = () => {
    if (!!store.get(config.localStorageKeys.token)) {
      return <Component exact path={path} />
    }

    return <Redirect to={{ pathname: routePaths.login }} />
  }

  return (
    <Switch>
      <Route exact path={routePaths.connect} component={Connect} />
      <Route exact path={routePaths.login} component={Home} />
      <Route render={componentRenderer} />
    </Switch>
  )
}

export { AuthenticationGateway }
