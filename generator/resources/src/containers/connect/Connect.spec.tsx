import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import * as React from 'react'

import { ConnectComponent } from './Connect'

configure({ adapter: new Adapter() })

describe(`<Connect />`, () => {
  it('renders', () => {
    const connectComponent = shallow(<ConnectComponent location={{ search: '' }} />)

    expect(connectComponent.exists()).toBeTruthy()
  })
})
