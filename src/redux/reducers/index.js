import { combineReducers } from 'redux';


import reducersAuthentication from './reducersAuthentication'
import reducersManga from './reducersManga'
import reducersChapter from './reducersChapter'
import reducersFavorite from './reducersFavorite'
// import reducersRooms from './reducersRooms'
// import reducersOrders from './reducersOrders'
// import reducersCustomer from './reducersCustomer';


const appReducer = combineReducers({
  authentication : reducersAuthentication,
  manga : reducersManga,
  chapter : reducersChapter,
  favorite : reducersFavorite,
  
//   rooms :reducersRooms,
//   orders : reducersOrders,
//   customers : reducersCustomer
})

export default appReducer