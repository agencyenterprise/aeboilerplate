import * as React from 'react'

import AuthenticationGateway from '../AuthenticationGateway'
import ProtectedRoutes from '../ProtectedRoutes'

const App = ({ location }: { location: any }) => {
  return (
    <div>
      <AuthenticationGateway component={ProtectedRoutes} location={location} path="/" />
    </div>
  )
}

export default App
