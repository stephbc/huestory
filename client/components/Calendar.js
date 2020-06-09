import React from 'react'
import {connect} from 'react-redux'
import {fetchUserDays} from '../store/days'

class Calendar extends React.Component {
  constructor() {
    super()
    this.DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    this.DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    this.DAYS_OF_THE_WEEK = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
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
      date: new Date(current.year, current.month - 1, current.day)
    })
  }

  clickNext(current) {
    this.setState({
      date: new Date(current.year, current.month + 1, current.day)
    })
  }

  render() {
    // console.log("calendar props", this.props)
    // console.log("calendar state", this.state)
    const days = this.isLeapYear(this.state.date.getFullYear())
      ? this.DAYS_LEAP
      : this.DAYS
    return (
      <div id="calendarFrame">
        CALENDAR
        {/* <div className="calendar">
          {this.props.days.map(day => {
            return <div key={day.date}>{day.date}</div>
          })}
        </div> */}
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
            <div key={d}>
              <strong>{d}</strong>
            </div>
          ))}
          {Array(days[this.state.month] + (this.state.startDay - 1))
            .fill(null)
            .map((_, index) => {
              const d = index - (this.state.startDay - 2)
              return (
                <div
                  key={d}
                  // isToday={d === this.state.date.getDate()}
                  // isSelected={d === this.state.day}
                  onClick={() =>
                    this.setDate(new Date(this.state.year, this.state.month, d))
                  }
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
    today: state.days.today
  }
}

const mapDispatchToProps = dispatch => ({
  fetchUserDays: userId => dispatch(fetchUserDays(userId))
  // getSingleMood: name => dispatch(getSingleMood(name))
})

export default connect(mapState, mapDispatchToProps)(Calendar)
