import axios from 'axios'

const GET_ALL_MOODS = 'GET_ALL_MOODS'
const GET_SINGLE_MOOD = 'GET_SINGLE_MOOD'

export const getAllMoods = moods => {
  return {
    type: GET_ALL_MOODS,
    moods
  }
}
export const getSingleMood = mood => {
  return {
    type: GET_SINGLE_MOOD,
    mood
  }
}

export const fetchAllMoods = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/moods')
      dispatch(getAllMoods(data))
    } catch (error) {
      console.error(error)
    }
  }
}
export const fetchSingleMood = color => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/moods/${color}`)
      dispatch(getSingleMood(data))
    } catch (error) {
      console.error(error)
    }
  }
}

const initialState = {
  moods: [],
  mood: {}
}

function moodsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_MOODS:
      return {...state, moods: action.moods}
    case GET_SINGLE_MOOD:
      return {...state, mood: action.mood}
    default:
      return state
  }
}

export default moodsReducer
