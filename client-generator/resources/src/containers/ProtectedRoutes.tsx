import * as React from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import User from './user/User'
import Home from './home/Home'

class ProtectedRoutes extends React.Component<any, any> {
  render() {
    return (
      <Switch>
        <Route exact path="/user" component={User} />
        <Route path="/" component={Home} />
      </Switch>
    )
  }
}

export default connect(
  null,
  null,
  null,
  { pure: false },
)(ProtectedRoutes)
