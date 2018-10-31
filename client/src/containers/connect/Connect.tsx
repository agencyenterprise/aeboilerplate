import * as queryString from 'query-string'
import * as React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import * as store from 'store'

import { config } from '../../config'
import { authenticate } from '../../redux/ducks/authenticate'

class ConnectComponent extends React.Component<any, any> {
  componentDidMount() {
    const { token: queryToken } = this.parseQueryString()

    const token = Array.isArray(queryToken) ? queryToken[0] : queryToken

    if (token) {
      store.set(config.localStorageKeys.token, token)
      this.props.dispatch(authenticate(token))
    }
  }

  parseQueryString() {
    return queryString.parse(this.props.location.search)
  }

  render() {
    return <Redirect to="/" />
  }
}

const Connect = connect()(ConnectComponent)

export { Connect }
