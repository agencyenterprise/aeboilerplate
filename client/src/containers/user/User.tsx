import * as React from 'react'
import { connect } from 'react-redux'

import './user.scss'

import { getMe } from '../../redux/ducks/get-me'

class UserComponent extends React.Component<any, any> {
  componentDidMount() {
    this.props.dispatch(getMe())
  }

  render() {
    const loading = this.props.me.loading
    const me = this.props.me.me

    return loading ? (
      <span>Loading...</span>
    ) : (
      <div className="logged-user">
        <div>
          <h1>{`${me.first_name} ${me.last_name}`}</h1>
          <span>{me.email}</span>
        </div>
        <br />
        <button onClick={() => this.props.history.goBack()}>Go back</button>
      </div>
    )
  }
}

const mapStateToProps = (state: any) => {
  return {
    me: state.me,
  }
}

const User = connect(mapStateToProps)(UserComponent)

export { User }
