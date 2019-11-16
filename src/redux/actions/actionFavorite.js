import * as types from './../types'
import axios from 'axios'

export const getUserFavorite = (userId) => ({
    type : types.USERFAVORITE,
    payload : axios.get(`http://192.168.73.2:5000/readmanga/favorite/${userId}`)
})
export const addFavorite = (userId,mangaId) => ({
    type : types.ADDFAVORITE,
    payload : axios.post('http://192.168.73.2:5000/readmanga/favorite/add',{
        user_id : userId,
        manga_id : mangaId
    })
})
export const getDetailFavorite = (userId,mangaId) => ({
    type : types.DETAILFAVORITE,
    payload : axios.get(`http://192.168.73.2:5000/readmanga/favorite/user/${userId}/manga/${mangaId}`)
})
export const deleteFavorite = (favoriteId) => ({
    type : types.DELETEFAVORITE,
    payload : axios.delete(`http://192.168.73.2:5000/readmanga/favorite/delete/${favoriteId}`)
})