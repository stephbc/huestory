import axios from 'axios'

const GET_ALL_DAYS = 'GET_ALL_DAYS'
const GET_SINGLE_DAY = 'GET_SINGLE_DAY'

export const getAllDays = days => {
  return {
    type: GET_ALL_DAYS,
    days
  }
}
export const getSingleDay = day => {
  return {
    type: GET_SINGLE_DAY,
    day
  }
}

export const fetchAllDays = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/days')
      dispatch(getAllDays(data))
    } catch (error) {
      console.error(error)
    }
  }
}
export const fetchUserDays = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/days/${userId}`)
      dispatch(getAllDays(data))
    } catch (error) {
      console.error(error)
    }
  }
}
export const fetchSingleDay = date => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/days/${date}`)
      dispatch(getSingleDay(data))
    } catch (error) {
      console.error(error)
    }
  }
}

const initialState = {
  days: [],
  day: {}
}

function daysReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_DAYS:
      return {...state, days: action.days}
    case GET_SINGLE_DAY:
      return {...state, day: action.day}
    default:
      return state
  }
}

export default daysReducer
