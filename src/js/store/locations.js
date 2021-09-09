import { api } from '../services/auth.service';

class Location {
    constructor(api){
        this.api = api;
        this.countries = null;
        this.shortCoutries = {};
    }
    async init(){
        const response = await Promise.all([
            this.api.getCountries(),
        ]);
        
        const [countries] = response;
        this.countries = countries;
        this.shortCoutries = this.createShortCountries(this.countries);

        return response;
    }

    createShortCountries(countries) {
        return Object.values(countries).reduce((acc, countrie) => {
            acc[countrie] = null;
            return acc;
        }, {});
    }
}

const location = new Location(api);

export default location;