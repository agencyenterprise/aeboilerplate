import * as React from 'react'
import { connect } from 'react-redux'

import '../../config'
import './home.scss'

import { routePaths } from '../route-paths'
import logo from './logo.svg'

class HomeComponent extends React.Component<any, any> {
  public render() {
    return (
      <div className="home">
        <header className="home-header">
          <img src={logo} className="home-logo" alt="logo" />
          <h1 className="home-title">Welcome to Krei!</h1>
        </header>
        <a href={routePaths.loggedUser.root}>
          <button>Open logged user</button>
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
