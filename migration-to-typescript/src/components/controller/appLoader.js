import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: 'd8de63ac42754b9f8a42551770559e9c', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
