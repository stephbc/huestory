import React from 'react'
import {connect} from 'react-redux'
import {fetchUserDays} from '../store/days'
import CalendarDay from './CalendarDay'

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
    }
  }

  getStartDayOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
  }

  componentDidMount() {
    this.props.fetchUserDays(this.props.userId)
  }

  clickPrev(current) {
    this.setState({
      date: new Date(current.year, current.month - 1, 1),
      day: 0,
      month: current.month - 1,
      year: current.year,
      startDay: this.getStartDayOfMonth(
        new Date(current.year, current.month - 1, 1)
      )
    })
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

  // clickDate(d) {
  //   console.log(d, "day")
  //   this.setState({
  //     date: new Date(d.year, d.month, d),
  //     day: d,
  //   })
  // }

  render() {
    // console.log("calendar props", this.props)
    // console.log("calendar state", this.state)
    const days = this.isLeapYear(this.state.date.getFullYear())
      ? this.DAYS_LEAP
      : this.DAYS

    // const todayColor = this.props.mood.find(moodObj => moodObj.id === this.props.today.moodId)

    return (
      <div id="calendarFrame">
        Here's your month so far {this.props.firstName}:
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
                <CalendarDay
                  key={d}
                  d={d}
                  // onClick={() => this.clickDate(d)}
                />
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
})

export default connect(mapState, mapDispatchToProps)(Calendar)
