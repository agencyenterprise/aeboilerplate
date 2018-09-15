import * as queryString from 'query-string'
import * as React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import * as store from 'store'

import { config } from '../../config'
import { authenticate } from '../../redux/ducks/authenticate'
import { getMe } from '../../redux/ducks/get-me'

class ConnectComponent extends React.Component<any, any> {
  componentDidMount() {
    const { token } = this.parseQueryString()

    if (token) {
      store.set(config.localStorageKeys.token, token)
      this.props.dispatch(authenticate(token))
      this.props.dispatch(getMe())
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
