import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import * as React from 'react'

import { config } from '../../config'
import { Login } from './Login'

configure({ adapter: new Adapter() })

describe(`<Login />`, () => {
  it('renders', () => {
    expect(shallow(<Login />).exists()).toBeTruthy()
  })

  it('has login class', () => {
    expect(shallow(<Login />).hasClass('login')).toBeTruthy()
  })

  it('has links pointing to google, facebook and linkedin providers', () => {
    const links = shallow(<Login />)
      .find('a')
      .getElements()
      .map((element) => element.props.href)

    expect(links).toEqual([config.authUrl.google, config.authUrl.facebook, config.authUrl.linkedIn])
  })
})
