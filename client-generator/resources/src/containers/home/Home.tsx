import * as React from 'react'

import './home.scss'

import logo from './logo.svg'

class Home extends React.Component<any, any> {
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
        <a href="http://localhost:3001/auth/linkedin">
          <button>Login with LinkedIn</button>
        </a>
      </div>
    )
  }
}

export default Home
