import React from 'react'
import {connect} from 'react-redux'
import {fetchAllMoods} from '../store/mood'

class MoodSelector extends React.Component {
  componentDidMount() {
    this.props.fetchAllMoods()
  }

  render() {
    console.log('mood selector component', this.props)
    return (
      <div className="moods-selector">
        {this.props.moods.map(mood => {
          return <div key={mood.color}>{mood.mood}</div>
        })}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  moods: state.mood.moods
})

const mapDispatchToProps = dispatch => ({
  fetchAllMoods: () => dispatch(fetchAllMoods())
  // getSingleMood: name => dispatch(getSingleMood(name))
})

export default connect(mapStateToProps, mapDispatchToProps)(MoodSelector)
