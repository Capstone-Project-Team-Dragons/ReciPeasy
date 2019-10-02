import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.spoonacular.com/recipes',
    headers: {
        Authorization: 'Bearer df73c947e0484c74b5e11458fe787318'
    }
})