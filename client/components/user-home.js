import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Route, Switch} from 'react-router-dom'
import MoodSelector from './MoodSelector'
import Calendar from './Calendar'

/**
 * COMPONENT
 */
export const UserHome = () => {
  // const [moodToday, setMoodToday] = useState("")

  return (
    <div>
      <Switch>
        <Route exact path="/home" component={MoodSelector} />
        <Route path="/home/calendar" component={Calendar} />
        <Route component={Calendar} />
      </Switch>
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
