import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
// import {Route, Switch} from 'react-router-dom'
import MoodSelector from './MoodSelector'
import Dashboard from './Dashboard'

/**
 * COMPONENT
 */
export const UserHome = () => {
  // const [moodToday, setMoodToday] = useState("")

  return (
    <div>
      <MoodSelector />

      {/* <Switch>
        {/* <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route component={MoodSelector} />
      </Switch> */}
      <Dashboard />
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
