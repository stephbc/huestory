import React from 'react'
import {connect} from 'react-redux'
import {fetchAllMoods} from '../store/mood'
import {addTodaysMoodThunk} from '../store/days'

class MoodSelector extends React.Component {
  constructor() {
    super()
    this.state = {
      moodToday: ''
    }
  }
  componentDidMount() {
    this.props.fetchAllMoods()
  }

  handleClick(userId, moodId) {
    event.preventDefault()
    // console.log('handleclick', mood)
    // console.log(userId, moodId)

    this.props.addTodaysMoodThunk(userId, moodId)
    this.setState({moodToday: event.target.innerText})
  }

  render() {
    // console.log('mood selector component', this.props)
    if (this.state.moodToday === '') {
      return (
        <div>
          <h3>Welcome, {this.props.firstName}</h3>
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
            {/* <button type="submit"></button> */}
          </div>
        </div>
      )
    } else {
      return <div>{this.state.moodToday}</div>
    }
  }
}

const mapStateToProps = state => ({
  moods: state.mood.moods,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  fetchAllMoods: () => dispatch(fetchAllMoods()),
  addTodaysMoodThunk: (userId, moodId) =>
    dispatch(addTodaysMoodThunk(userId, moodId))

  // getSingleMood: name => dispatch(getSingleMood(name))
})

export default connect(mapStateToProps, mapDispatchToProps)(MoodSelector)
