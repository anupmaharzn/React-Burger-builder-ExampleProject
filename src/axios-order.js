import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-app-18fae-default-rtdb.firebaseio.com/'
});

export default instance;