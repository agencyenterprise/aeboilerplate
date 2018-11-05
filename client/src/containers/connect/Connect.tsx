import * as queryString from 'query-string'
import * as React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import * as store from 'store'

import { config } from '../../config'
import { authenticate } from '../../redux/ducks/authenticate'
import { getMe } from '../../redux/ducks/get-me'
import { routePaths } from '../route-paths'

export class ConnectComponent extends React.Component<any, any> {
  getToken = () => {
    const { token: queryToken } = queryString.parse(this.props.location.search)

    return Array.isArray(queryToken) ? queryToken[0] : queryToken
  }

  componentDidMount() {
    const token = this.getToken()

    if (!token) {
      return
    }

    store.set(config.localStorageKeys.token, token)

    this.props.dispatch(authenticate(token))
    this.props.dispatch(getMe())
  }

  render() {
    return <Redirect to={routePaths.root} />
  }
}

const Connect = connect()(ConnectComponent)

export { Connect }
