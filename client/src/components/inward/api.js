import axios from 'axios'

// Create instance called instance
const instance = axios.create({
    baseURL: 'https://example.com',
    headers: {
        'content-type':'application/octet-stream',
        'x-rapidapi-host':'example.com',
        'x-rapidapi-key': process.env.RAPIDAPI_KEY
    },
});

export default {
    getData: () =>
    instance({
        'method':'GET',
        'url':'/query',
        'params': {
            'search':'parameter',
        },
    }),
    postData: () =>
    instance({
        'method': 'POST',
        'url':'/api',
        'data': {
            'item1':'data1',
            'item2':'item2'
        }
    })
}