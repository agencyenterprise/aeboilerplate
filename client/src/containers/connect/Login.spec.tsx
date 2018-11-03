import { configure, shallow } from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'
import * as React from 'react'

import { config } from '../../config'
import { Login } from './Login'

configure({ adapter: new Adapter() })

describe(`<Login />`, () => {
  it('renders without throwing an error', () => {
    expect(shallow(<Login />).exists()).toBeTruthy()
  })

  it('has login class', () => {
    expect(shallow(<Login />).hasClass('login')).toBeTruthy()
  })

  it('has a link pointing to google path', () => {
    expect(
      shallow(<Login />)
        .find('a')
        .prop('href'),
    ).toEqual(config.auth.googleAuthURL)
  })
})
