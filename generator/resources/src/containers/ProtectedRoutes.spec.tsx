import { configure, shallow } from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'
import * as React from 'react'

import { ProtectedRoutesComponent } from './ProtectedRoutes'

configure({ adapter: new Adapter() })

describe(`<ProtectedRoutes />`, () => {
  it('renders', () => {
    const protectedRoutesComponent = shallow(<ProtectedRoutesComponent />)

    expect(protectedRoutesComponent.exists()).toBeTruthy()
  })
})
