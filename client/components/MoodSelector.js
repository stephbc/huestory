import React from 'react'
import {connect} from 'react-redux'
import {fetchAllMoods} from '../store/mood'
import {addTodaysMoodThunk, fetchTodaysMood} from '../store/days'
// import { Link } from 'react-router-dom'
import Calendar from './Calendar'

class MoodSelector extends React.Component {
  componentDidMount() {
    console.log('componentdidmount', this.props.user)
    this.props.fetchAllMoods()
    this.props.fetchTodaysMood(Number(this.props.user.id))
  }

  handleClick(userId, moodId) {
    event.preventDefault()
    // console.log('handleclick', mood)
    // console.log(userId, moodId)
    this.props.addTodaysMoodThunk(userId, moodId)
    // this.setState({this.state.today: event.target.innerText})
  }

  render() {
    // console.log('mood selector component', this.props)
    // console.log(this.state.today)
    if (!this.props.today) {
      return (
        <div>
          <h3>Welcome, {this.props.user.firstName}</h3>
          <h4>How are you feeling today?</h4>
          <div className="moods-selector">
            {this.props.moods.map(mood => {
              return (
                <div key={mood.color}>
                  <button
                    type="submit"
                    onClick={() =>
                      this.handleClick(this.props.user.id, mood.id)
                    }
                  >
                    {mood.mood}
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      )
    } else {
      return <Calendar />
    }
  }
}

const mapStateToProps = state => ({
  moods: state.mood.moods,
  user: state.user,
  today: state.today
})

const mapDispatchToProps = dispatch => ({
  fetchAllMoods: () => dispatch(fetchAllMoods()),
  addTodaysMoodThunk: (userId, moodId) =>
    dispatch(addTodaysMoodThunk(userId, moodId)),
  fetchTodaysMood: userId => dispatch(fetchTodaysMood(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(MoodSelector)
