import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';

const datepickers = document.querySelectorAll('#datepicker-birthday');
M.Datepicker.init(datepickers, {
  showClearBtn: true,
  format: 'dd-mm-yyyy',
  yearRange: 50
});

export function getDatePickerInstance(elem) {
  return M.Datepicker.getInstance(elem);
}

const autocomplete = document.querySelectorAll('.autocomplete');
M.Autocomplete.init(autocomplete);

export function getAutocompleteInstance(elem) {
  return M.Autocomplete.getInstance(elem);
}