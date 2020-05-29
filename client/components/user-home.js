import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import MoodSelector from './MoodSelector'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {firstName} = props

  // console.log(props)

  return (
    <div>
      <h3>Welcome, {firstName}</h3>
      <MoodSelector />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  // console.log(state)
  return {
    // email: state.user.email,
    firstName: state.user.firstName
    // moods: state.mood.moods
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
