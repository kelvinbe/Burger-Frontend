import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://burger-back-app.firebaseio.com/'
})

export default instance