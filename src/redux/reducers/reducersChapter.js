import * as types from './../types'

const initialState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    chapterManga: []
  };
  const  reducerChapterManga = (state=initialState,action) =>{
    switch(action.type){
        case `${types.CHAPTERMANGA}_PENDING`:
            return{
                ...state,
                isLoading: true
            }
        case `${types.CHAPTERMANGA}_FULFILLED`:
            return{
                ...state,
                isLoading: false,
                isSuccess: true,
                chapterManga: action.payload.data
            }
        case `${types.CHAPTERMANGA}_REJECTED`:
            return{
                ...state,
                isError:true,
                isLoading:false
            }
        case `${types.DELETECHAPTER}_PENDING`:
            return{
                ...state,
                isLoading: true
            }
        case `${types.DELETECHAPTER}_FULFILLED`:
            return{
                ...state,
                isLoading: false,
                isSuccess: true,
            }
        case `${types.DELETECHAPTER}_REJECTED`:
            return{
                ...state,
                isError:true,
                isLoading:false
            }
        default :
            return state;
    }
  }
  export default reducerChapterManga