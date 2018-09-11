import * as React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import * as store from 'store'

import config from '../../config'
import { authenticate } from '../../redux/ducks/authenticate'

class Connect extends React.Component<any, any> {
  componentDidMount() {
    // TODO: GET token parameter and SET authenticated to true and the token value
    const token = 'token_value'

    if (token) {
      store.set(config.localStorageKeys.token, token)
      this.props.dispatch(authenticate(token))
    }
  }

  render() {
    const authenticated = this.props.authenticated

    if (authenticated) {
      return <Redirect to="/user" />
    }

    return <Redirect to="/" />
  }
}

const mapStateToProps = (state: any) => ({
  authenticated: state.authenticated,
})

export default connect(mapStateToProps)(Connect)
