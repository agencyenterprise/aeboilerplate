import * as React from 'react'
import { Route } from 'react-router-dom'

export const PublicRoute = ({ component: Component, ...rest }) => {
  const renderComponent = (props) => (
    <main>
      <Component {...props} />
    </main>
  )

  return <Route {...rest} render={renderComponent} />
}
