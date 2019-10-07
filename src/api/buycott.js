import axios from 'axios';
import { BUYCOTT_API } from 'react-native-dotenv';

export default axios.create({
    baseURL: 'https://buycott.com/api/v4/products/lookup',
    headers: {
        Authorization: `Bearer ${BUYCOTT_API}`
    }
})