import axios from 'axios';
import { SPOON_API } from 'react-native-dotenv';

export default axios.create({
    baseURL: 'https://api.spoonacular.com/recipes',
    headers: {
        Authorization: `Bearer ${SPOON_API}`
    }
})