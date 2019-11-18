import * as types from './../types'

const initialState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    detailMangaLoading:false,
    detailMangaError:false,
    detailMangaSuccess:false,
    manga: [],
    mangaUser: [],
    detailManga:''
  };
  const  reducerManga = (state=initialState,action) =>{
    switch(action.type){
        case `${types.MANGAUSER}_PENDING`:
            return{
                ...state,
                isLoading: true
            }
        case `${types.MANGAUSER}_FULFILLED`:
            return{
                ...state,
                isLoading: false,
                isSuccess: true,
                mangaUser: action.payload.data
            }
        case `${types.MANGAUSER}_REJECTED`:
            return{
                ...state,
                isError:true,
                isLoading:false
            }
        case `${types.MANGA}_PENDING`:
            return{
                ...state,
                isLoading: true
            }
        case `${types.MANGA}_FULFILLED`:
            return{
                ...state,
                isLoading: false,
                isSuccess: true,
                manga: action.payload.data
            }
        case `${types.MANGA}_REJECTED`:
            return{
                ...state,
                isError:true,
                isLoading:false
            }
        case `${types.DETAILMANGA}_PENDING`:
            return{
                 ...state,
                detailMangaLoading: true
            }
        case `${types.DETAILMANGA}_FULFILLED`:
            return{
                 ...state,
                detailMangaLoading: false,
                detailMangaSuccess: true,
                detailManga: action.payload.data
            }
        case `${types.DETAILMANGA}_REJECTED`:
            return{
                ...state,
                detailMangaError:true,
                detailMangaLoading:false
            }
        case `${types.ADDMANGA}_PENDING`:
            return{
                 ...state,
                isLoading: true
            }
        case `${types.ADDMANGA}_FULFILLED`:
            return{
                 ...state,
                isLoading: false,
                isSuccess: true,
            }
        case `${types.ADDMANGA}_REJECTED`:
            return{
                ...state,
                isError:true,
                isLoading:false
            }
        case `${types.UPDATEMANGA}_PENDING`:
            return{
                 ...state,
                isLoading: true
            }
        case `${types.UPDATEMANGA}_FULFILLED`:
            return{
                 ...state,
                isLoading: false,
                isSuccess: true,
            }
        case `${types.UPDATEMANGA}_REJECTED`:
            return{
                ...state,
                isError:true,
                isLoading:false
            }
        case `${types.DELETEMANGA}_PENDING`:
            return{
                 ...state,
                isLoading: true
            }
        case `${types.DELETEMANGA}_FULFILLED`:
            return{
                 ...state,
                isLoading: false,
                isSuccess: true,
            }
        case `${types.DELETEMANGA}_REJECTED`:
            return{
                ...state,
                isError:true,
                isLoading:false
            }
        default :
            return state;
    }
  }
  export default reducerManga