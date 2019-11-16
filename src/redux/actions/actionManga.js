import * as types from './../types'
import axios from 'axios'

export const getAllManga = () => ({
    type : types.MANGA,
    payload : axios.get('http://192.168.73.2:5000/readmanga/manga')
})

export const getDetailManga = (mangaId) => ({
    type : types.DETAILMANGA,
    payload : axios.get(`http://192.168.73.2:5000/readmanga/manga/${mangaId}`)
})