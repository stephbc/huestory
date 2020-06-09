import React from 'react'
import {connect} from 'react-redux'
import {fetchUserDays} from '../store/days'

class Calendar extends React.Component {
  constructor() {
    super()
    this.DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    this.DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    this.DAYS_OF_THE_WEEK = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
    this.MONTHS = [
      'JAN',
      'FEB',
      'MAR',
      'APR',
      'MAY',
      'JUN',
      'JUL',
      'AUG',
      'SEP',
      'OCT',
      'NOV',
      'DEC'
    ]

    this.today = new Date()

    this.state = {
      date: this.today,
      day: this.today.getDate(),
      month: this.today.getMonth(),
      year: this.today.getFullYear(),
      startDay: this.getStartDayOfMonth(this.today)
      // todayColor: ""
    }
  }

  getStartDayOfMonth(date) {
    // console.log("getstart", date)
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
  }

  componentDidMount() {
    // console.log(this.props)
    this.props.fetchUserDays(this.props.userId)
    // this.setState({todayColor: this.props.mood.find(moodObj => moodObj.id === this.props.today.moodId)})
  }

  clickPrev(current) {
    // console.log(current, "current")
    this.setState({
      date: new Date(current.year, current.month - 1, 1),
      day: 0,
      month: current.month - 1,
      year: current.year,
      startDay: this.getStartDayOfMonth(
        new Date(current.year, current.month - 1, 1)
      )
    })
    // console.log(this.state.month)
  }

  clickNext(current) {
    this.setState({
      date: new Date(current.year, current.month + 1, 1),
      day: 0,
      month: current.month + 1,
      year: current.year,
      startDay: this.getStartDayOfMonth(
        new Date(current.year, current.month + 1, 1)
      )
    })
  }

  clickDate(d) {
    // console.log(d)
    this.setState({date: new Date(d.year, d.month, d)})
  }

  render() {
    // console.log("calendar props", this.props.today.moodId)
    // console.log("calendar moods", this.props.mood)
    // console.log("calendar state", this.state)
    // console.log(this.state, "today color")

    const days = this.isLeapYear(this.state.date.getFullYear())
      ? this.DAYS_LEAP
      : this.DAYS
    const calendarDay = d =>
      d === this.state.day && d !== 0 ? 'highlightToday' : 'calendarDay'
    return (
      <div id="calendarFrame">
        <div className="calendar">
          {this.props.days.map(day => {
            return <div key={day.date}>{day.date}</div>
          })}
        </div>
        <div id="calendarHeader">
          <button type="submit" onClick={() => this.clickPrev(this.state)}>
            Prev
          </button>
          <div>
            {this.MONTHS[this.state.month]} {this.state.year}
          </div>
          <button type="submit" onClick={() => this.clickNext(this.state)}>
            Next
          </button>
        </div>
        <div id="calendarBody">
          {this.DAYS_OF_THE_WEEK.map(d => (
            <div key={d} id="calendarWeek">
              <strong>{d}</strong>
            </div>
          ))}
          {Array(days[this.state.month] + this.state.startDay)
            .fill(null)
            .map((_, index) => {
              const d = index - (this.state.startDay - 1)
              return (
                <div
                  id={calendarDay(d)}
                  key={d}
                  // isToday={d === this.state.date.getDate()}
                  // isSelected={d === this.state.day}
                  onClick={() => this.clickDate(d)}
                >
                  {d > 0 ? d : ''}
                </div>
              )
            })}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    userId: state.user.id,
    firstName: state.user.firstName,
    days: state.days.days,
    today: state.days.today,
    mood: state.mood.moods
  }
}

const mapDispatchToProps = dispatch => ({
  fetchUserDays: userId => dispatch(fetchUserDays(userId))
  // getSingleMood: name => dispatch(getSingleMood(name))
})

export default connect(mapState, mapDispatchToProps)(Calendar)
