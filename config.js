const apiUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:8000/api' : 'http://168.75.95.7/api'

export {
    apiUrl
};