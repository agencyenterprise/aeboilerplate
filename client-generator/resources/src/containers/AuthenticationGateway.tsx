import * as React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import * as store from 'store'

import config from '../config'
import Connect from './connect/Connect'

const PrivateRoute = ({ component: Component, path, location }: { component: any; path: string; location: any }) => {
  const componentRenderer = () => {
    if (!!store.get(config.localStorageKeys.token)) {
      return <Component exact path={path} />
    }

    return <Redirect to={{ pathname: '/connect' }} />
  }

  return (
    <Switch>
      <Route exact path="/connect" component={Connect} />
      <Route render={componentRenderer} />
    </Switch>
  )
}

export default PrivateRoute
