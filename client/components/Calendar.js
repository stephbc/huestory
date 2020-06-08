import React from 'react'
import {connect} from 'react-redux'
import {fetchUserDays} from '../store/days'

class Calendar extends React.Component {
  // const {firstName} = props

  componentDidMount() {
    this.props.fetchUserDays(this.props.userId)
  }

  render() {
    console.log(this.props.days)
    return (
      <div>
        <div className="calendar">
          {/* {this.props.days.map(day => {
            return <div key={day.date}>{day.date}</div>
          })} */}
          CALENDAR
          {this.props.days.length}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  // console.log(state)
  return {
    userId: state.user.id,
    firstName: state.user.firstName,
    days: state.days.days
  }
}

const mapDispatchToProps = dispatch => ({
  fetchUserDays: userId => dispatch(fetchUserDays(userId))
  // getSingleMood: name => dispatch(getSingleMood(name))
})

export default connect(mapState, mapDispatchToProps)(Calendar)
