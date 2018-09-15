import * as React from 'react'
import { connect } from 'react-redux'

import '../../config'
import './home.scss'

import logo from './logo.svg'
import { config } from '../../config'
import { getMe } from '../../redux/ducks/get-me'

class HomeComponent extends React.Component<any, any> {
  componentDidMount() {
    this.props.dispatch(getMe())
  }

  public render() {
    return (
      <div className="home">
        <header className="home-header">
          <img src={logo} className="home-logo" alt="logo" />
          <h1 className="home-title">Welcome to React</h1>
        </header>
        <p className="home-intro">
          To get started, edit <code>src/containers/Home.tsx</code> and save to reload.
        </p>
        <a href={config.auth.linkedInAuthURL || '/api/auth/linkedin'}>
          <button>Login with LinkedIn</button>
        </a>
      </div>
    )
  }
}

const Home = connect()(HomeComponent)

export { Home }
