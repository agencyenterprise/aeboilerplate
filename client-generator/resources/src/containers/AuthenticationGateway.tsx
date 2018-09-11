import * as React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import * as store from 'store'

import config from '../config'
import Connect from './connect/Connect'
import Home from './home/Home'

const PrivateRoute = ({ component: Component, path }: { component: any; path: string; location: any }) => {
  const componentRenderer = () => {
    if (!!store.get(config.localStorageKeys.token)) {
      return <Component exact path={path} />
    }

    return <Redirect to={{ pathname: '/' }} />
  }

  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/auth/linkedin/callback" component={Connect} />
      <Route render={componentRenderer} />
    </Switch>
  )
}

export default PrivateRoute
