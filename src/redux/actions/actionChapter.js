import * as types from './../types'
import axios from 'axios'

export const getChapterManga = (mangaId) => ({
    type : types.CHAPTERMANGA,
    payload : axios.get(`http://192.168.73.2:5000/readmanga/chapter/${mangaId}`)
})
