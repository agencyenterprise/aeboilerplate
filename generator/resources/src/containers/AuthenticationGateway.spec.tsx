import { configure, mount, shallow } from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'
import * as React from 'react'
import { MemoryRouter } from 'react-router-dom'

import { AuthenticationGateway } from './AuthenticationGateway'

configure({ adapter: new Adapter() })
jest.mock('store')

describe(`<AuthenticationGateway />`, () => {
  it('renders', () => {
    const authenticationGateway = shallow(<AuthenticationGateway component={() => <div />} path="/test" />)

    expect(authenticationGateway.exists()).toBeTruthy()
  })

  it('without token returns login component', () => {
    require('store').setReturnedValue(false)

    const authenticationGateway = mount(
      <MemoryRouter>
        <AuthenticationGateway component={() => <div />} path="/test" />
      </MemoryRouter>,
    )

    expect(authenticationGateway.text()).toEqual('Login with Google')
  })

  it('with token returns passed component', () => {
    require('store').setReturnedValue(true)

    const expectedText = 'Logged User'

    const authenticationGateway = mount(
      <MemoryRouter>
        <AuthenticationGateway component={() => <div>{expectedText}</div>} path="/test" />
      </MemoryRouter>,
    )

    expect(authenticationGateway.text()).toEqual(expectedText)
  })
})
