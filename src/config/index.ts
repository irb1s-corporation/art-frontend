const rootUrl = () => {
    if (document.location.host === 'localhost') {
        return 'http://localhost:5000/'
    } else if (document.location.host === 'localhost:3000') {
        return 'http://localhost:5000/'
    } else if (document.location.host === 'irb1s.ru') {
        return '/';
    } else {
        console.log('Error, the address connection is not defined')
        return;
    }
}

export const ROOT_URL = rootUrl();