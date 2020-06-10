import React from 'react'
import {connect} from 'react-redux'

const CalendarDay = props => {
  // console.log(props)

  const moodyDays = props.days.map(dayObj => Number(dayObj.date.slice(-2)))
  // console.log(moodyDays)

  const dailyColor = d => {
    if (moodyDays.includes(d)) {
      let thisDay = props.days.find(
        dayObj => Number(dayObj.date.slice(-2)) === d
      )
      let thisMood = props.mood.find(mood => mood.id === thisDay.moodId)
      if (thisMood) {
        return `calDay${thisMood.color}`
      }
    }
    return 'calendarDay'
  }

  return (
    <div
      // id="calendarDay"
      id={dailyColor(props.d)}
    >
      {/* {dailyColor(props.d)} */}
      {props.d > 0 ? props.d : ''}
    </div>
  )
}

const mapState = state => {
  return {
    days: state.days.days,
    today: state.days.today,
    mood: state.mood.moods
  }
}

export default connect(mapState, null)(CalendarDay)
// export default CalendarDay
