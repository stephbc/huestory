import axios from 'axios'

const GET_ALL_DAYS = 'GET_ALL_DAYS'
const GET_TODAYS_MOOD = 'GET_TODAYS_MOOD'
const ADD_TODAYS_MOOD = 'ADD_TODAYS_MOOD'

export const getAllDays = days => {
  return {
    type: GET_ALL_DAYS,
    days
  }
}
export const getTodaysMood = today => {
  return {
    type: GET_TODAYS_MOOD,
    today
  }
}
export const addTodaysMood = today => {
  return {
    type: ADD_TODAYS_MOOD,
    today
  }
}

// export const fetchAllDays = () => {
//   return async dispatch => {
//     try {
//       const {data} = await axios.get('/api/days')
//       dispatch(getAllDays(data))
//     } catch (error) {
//       console.error(error)
//     }
//   }
// }
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
export const fetchTodaysMood = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/days/${userId}/today`)
      dispatch(getTodaysMood(data[0]))
    } catch (error) {
      console.error(error)
    }
  }
}
export const addTodaysMoodThunk = (userId, moodId) => {
  return async dispatch => {
    try {
      const {data} = await axios.post(`/api/days/${userId}/${moodId}`)
      dispatch(addTodaysMood(data))
    } catch (error) {
      console.error(error)
    }
  }
}

const initialState = {
  days: [],
  today: {}
}

function daysReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_DAYS:
      return {...state, days: action.days}
    case GET_TODAYS_MOOD:
      return {...state, today: action.today}
    case ADD_TODAYS_MOOD:
      return {
        ...state,
        days: [...state.days, action.today],
        today: action.today
      }
    default:
      return state
  }
}

export default daysReducer
