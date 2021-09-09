import { getAutocompleteInstance } from "../plugins/materialize/materialize";

class Autocomplete {
  constructor(autocompleteInstance){
    this.$form = document.forms['authForm'];

    this.country = document.getElementById('autocomplete-country');
    this.autocompleteCountry = autocompleteInstance(this.country);

    this.city = document.getElementById('autocomplete-city');
    this.autocompleteCity= autocompleteInstance(this.city);
  }

  setAutocompleteCity(data) {
    console.log(this.country, this.city);
    this.autocompleteCity.updateData(data);
  }

  setAutocompleteCountry(data){
    this.autocompleteCountry.updateData(data);
  }
}

const autocomplete = new Autocomplete(getAutocompleteInstance);

export default autocomplete;


