import * as types from './../types'
import axios from 'axios'

export const login = (inputUsername,inputPassword) => ({
    type : types.LOGIN,
    payload : axios.post('http://192.168.82.2:5000/readmanga/login',{
        email : inputUsername,
        password : inputPassword
    })
})