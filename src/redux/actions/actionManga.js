import * as types from './../types'
import axios from 'axios'

export const getAllManga = () => ({
    type : types.MANGA,
    payload : axios.get('http://192.168.82.2:5000/readmanga/manga')
})

export const getDetailManga = (mangaId) => ({
    type : types.DETAILMANGA,
    payload : axios.get(`http://192.168.82.2:5000/readmanga/manga/${mangaId}`)
})

export const addManga = (dataManga) => ({
    type : types.ADDMANGA,
    payload : axios.post('http://192.168.82.2:5000/readmanga/manga/add',dataManga)
})
export const getMangaUser = (userId) => ({
    type : types.MANGAUSER,
    payload : axios.get(`http://192.168.82.2:5000/readmanga/manga/user/${userId}`)
})

export const updateManga = (dataManga) => ({
    type : types.UPDATEMANGA,
    payload: axios.put(`http://192.168.82.2:5000/readmanga/manga/update/${dataManga.id}`,{
        title : dataManga.title,
        genre : dataManga.genre,
        synopsis : dataManga.synopsis
    })
})
export const deleteManga = (mangaId) => ({
    type : types.DELETEMANGA,
    payload : axios.delete(`http://192.168.82.2:5000/readmanga/manga/delete/${mangaId}`)
})