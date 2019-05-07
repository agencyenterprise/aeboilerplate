import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import * as React from 'react'

import { UserComponent } from './User'

configure({ adapter: new Adapter() })

describe(`<User />`, () => {
  const mockGetMe = jest.fn()
  const mockHistoryGoBack = jest.fn()
  let userComponent

  beforeEach(() => {
    const mockMe = { me: { first_name: 'first', last_name: 'last', email: 'first@last.com' } }
    userComponent = shallow(<UserComponent me={mockMe} getMe={mockGetMe} history={{ goBack: mockHistoryGoBack }} />)
  })

  it('renders', () => {
    expect(userComponent.exists()).toBeTruthy()
  })

  it('gets the logged user data', () => {
    expect(mockGetMe).toBeCalled()
  })

  it('calls history go back when clicking on go back', () => {
    userComponent.find('button').simulate('click')

    expect(mockHistoryGoBack).toBeCalled()
  })
})
