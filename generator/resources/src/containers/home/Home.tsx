import * as React from 'react'
import { Link } from 'react-router-dom'

import '../../config'
import './home.scss'

import { routePaths } from '../route-paths'
import logo from './logo.svg'

export const Home = () => (
  <div className="home">
    <header className="home-header">
      <img src={logo} className="home-logo" alt="logo" />
      <h1 className="home-title">Welcome to AEboilerplate!</h1>
    </header>
    <Link to={routePaths.private.root}>
      <button>Open logged user</button>
    </Link>
  </div>
)
