import * as types from './../types'
import axios from 'axios'

export const getChapterManga = (mangaId) => ({
    type : types.CHAPTERMANGA,
    payload : axios.get(`http://192.168.82.2:5000/readmanga/chapter/${mangaId}`)
})
export const addChapterManga = (dataChapter) => ({
    type : types.ADDCHAPTER,
    payload : axios.post('http://192.168.82.2:5000/readmanga/chapter/add',{
        manga_id: dataChapter.mangaId,
        chapter_name: dataChapter.chapterName,
        chapter_number: dataChapter.chapterNumber
    })
})

export const deleteChapter = (chapterId) => ({
    type : types.DELETECHAPTER,
    payload : axios.delete(`http://192.168.82.2:5000/readmanga/chapter/delete/${chapterId}`)
})

