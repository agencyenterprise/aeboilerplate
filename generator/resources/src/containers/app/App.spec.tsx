import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import * as React from 'react'

import { App } from './App'

configure({ adapter: new Adapter() })

describe(`<App />`, () => {
  it('renders', () => {
    const appComponent = shallow(<App />)

    expect(appComponent.exists()).toBeTruthy()
  })
})
