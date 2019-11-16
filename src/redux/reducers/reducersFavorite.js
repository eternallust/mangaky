import * as types from './../types'

const initialState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    detailFavoriteLoading: false,
    detailFavoriteSuccess: false,
    detailFavoriteError:false,
    userFavorite: [],
    detailFavorite:'',
  };
  const  reducerFavorite = (state=initialState,action) =>{
    switch(action.type){
        case `${types.USERFAVORITE}_PENDING`:
            return{
                ...state,
                isLoading: true
            }
        case `${types.USERFAVORITE}_FULFILLED`:
            return{
                ...state,
                isLoading: false,
                isSuccess: true,
                userFavorite: action.payload.data
            }
        case `${types.USERFAVORITE}_REJECTED`:
            return{
                ...state,
                isError:true,
                isLoading:false
            }
        case `${types.ADDFAVORITE}_PENDING`:
            return{
                ...state,
                isLoading: true
            }
        case `${types.ADDFAVORITE}_FULFILLED`:
            return{
                ...state,
                isLoading: false,
                isSuccess: true,
            }
        case `${types.ADDFAVORITE}_REJECTED`:
            return{
                ...state,
                isError:true,
                isLoading:false
            }
        case `${types.DELETEFAVORITE}_PENDING`:
            return{
                ...state,
                isLoading: true
            }
        case `${types.DELETEFAVORITE}_FULFILLED`:
            return{
                ...state,
                isLoading: false,
                isSuccess: true,
            }
        case `${types.DELETEFAVORITE}_REJECTED`:
            return{
                ...state,
                isError:true,
                isLoading:false
            }
        
        case `${types.DETAILFAVORITE}_PENDING`:
            return{
                ...state,
                isLoading: true
            }
        case `${types.DETAILFAVORITE}_FULFILLED`:
            return{
                ...state,
                isLoading: false,
                isSuccess: true,
                detailFavorite: action.payload.data
            }
        case `${types.DETAILFAVORITE}_REJECTED`:
            return{
                ...state,
                isError:true,
                isLoading:false
            }
        default :
            return state;
    }
  }
  export default reducerFavorite