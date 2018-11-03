import * as React from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import { Home } from './home/Home'
import { routePaths } from './route-paths'
import { User } from './user/User'

class ProtectedRoutesComponent extends React.Component<any, any> {
  render() {
    return (
      <Switch>
        <Route exact path={routePaths.root} component={Home} />
        <Route exact path={routePaths.loggedUser.root} component={User} />
      </Switch>
    )
  }
}

const ProtectedRoutes = connect(
  null,
  null,
  null,
  { pure: false },
)(ProtectedRoutesComponent)

export { ProtectedRoutes }
