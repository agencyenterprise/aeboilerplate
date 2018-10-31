import * as React from 'react'
import { connect } from 'react-redux'

import '../../config'
import './home.scss'

import { config } from '../../config'
import logo from './logo.svg'

class HomeComponent extends React.Component<any, any> {
  public render() {
    return (
      <div className="home">
        <header className="home-header">
          <img src={logo} className="home-logo" alt="logo" />
          <h1 className="home-title">Welcome to Krei</h1>
        </header>
        <p className="home-intro">
          To get started, edit <code>src/containers/Home.tsx</code> and save to reload.
        </p>
        <a href={config.auth.googleAuthURL}>
          <button>Login with Google</button>
        </a>
      </div>
    )
  }
}

const mapStateToProps = (state: any) => {
  return {
    me: state.me.me,
  }
}

const Home = connect(mapStateToProps)(HomeComponent)

export { Home }
