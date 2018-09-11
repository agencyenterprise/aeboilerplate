import * as queryString from 'query-string'
import * as React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import * as store from 'store'

import config from '../../config'

class Connect extends React.Component<any, any> {
  componentDidMount() {
    const { code, state } = this.parseQueryString()

    if (code) {
      // await this.props.actions.fetchAccessToken({ code, state })
      console.log(code, state)
    }
  }

  componentWillReceiveProps(nextProps: any) {
    const accessToken = nextProps.authenticate.token && nextProps.authenticate.token.accessToken

    if (accessToken && accessToken.length > 0) {
      store.set(config.localStorageKeys.token, accessToken)
    }
  }

  parseQueryString() {
    return queryString.parse(this.props.location.search)
  }

  render() {
    // const auth = false

    // if (auth) {
    //   store.set(config.localStorageKeys.token, 'tokennnnnn')

    //   return <Redirect to="/user" />
    // }

    return <Redirect to="/" />
  }
}

const mapStateToProps = (state: any) => ({
  authenticate: state.authenticate,
})

export default connect(mapStateToProps)(Connect)
