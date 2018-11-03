import * as React from 'react'
import { connect } from 'react-redux'

import '../../config'
import './home.scss'

import { config } from '../../config'
import { getMe } from '../../redux/ducks/get-me'
import { routePaths } from '../route-paths'
import logo from './logo.svg'

class HomeComponent extends React.Component<any, any> {
  componentDidMount() {
    this.props.dispatch(getMe())
  }

  public render() {
    const me = this.props.me
    const loggedUserName = me ? `, ${me.first_name}` : ''
    const buttonRef = me ? routePaths.loggedUser.root : config.auth.googleAuthURL
    const buttonText = me ? 'Open logged user' : 'Login with Google'

    return (
      <div className="home">
        <header className="home-header">
          <img src={logo} className="home-logo" alt="logo" />
          <h1 className="home-title">
            Welcome to Krei
            {loggedUserName}!
          </h1>
        </header>
        <a href={buttonRef}>
          <button>{buttonText}</button>
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
