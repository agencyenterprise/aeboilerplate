import * as React from 'react'

import { AuthenticationGateway } from '../AuthenticationGateway'
import { ProtectedRoutes } from '../ProtectedRoutes'

const App = ({ location }: { location: any }) => (
  <AuthenticationGateway component={ProtectedRoutes} location={location} path="/" />
)

export { App }
