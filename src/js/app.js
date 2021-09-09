import 'bootstrap/dist/css/bootstrap.css';
import '../css/style.css';
import './plugins/materialize';

import UI from './config/ui.config';
import sing from './config/singup.config'
import { validate } from './helpers/validate';
import { showInputError, removeInputError } from './views/form';
import { login, singUp } from './services/auth.service';
import { notify } from './views/notifications';
import { getNews } from './services/news.service';
import mask from './helpers/mask';
import checkNumInput from './helpers/checkTextInput';
// import location from './store/locations';
// import autocomplete from './views/autocomplite';

import './views/tab';

const { form, inputEmail, inputPassword } = UI;
const {formSing, email, password, nikname, name, surname, phone, sex, city, country, birthday} = sing;
const inputs = [inputEmail, inputPassword];
const singInputs = [email, password, nikname, name, surname, phone, sex, city, country, birthday];



// initApp();
// Events
form.addEventListener('submit', (e) => {
  e.preventDefault();
  onSubmit();
});
formSing.addEventListener('submit', (e) => {
  e.preventDefault();
  onSingUp();
});

mask('#phone-auth');
checkNumInput('._text-only');
inputs.forEach(el => el.addEventListener('focus', () => removeInputError(el)));
singInputs.forEach(el => el.addEventListener('focus', () => removeInputError(el)));

// Handlers
// async function initApp(){
//   await location.init();
//   autocomplete.setAutocompleteCountry(location.shortCoutries);
// }
async function onSubmit() {
  inputs.forEach(el  => removeInputError(el));
  if (!checkValidation(inputs)) return;

  try {
    await login(inputEmail.value, inputPassword.value);
    await getNews();
    form.reset();
    notify({ msg: 'Login success', className: 'alert-success' });
  } catch (err) {
    notify({ mas: 'Login faild', className: 'alert-danger' });
  }
}
 async function onSingUp() {
  singInputs.forEach(el => removeInputError(el));
  if (!checkValidation(singInputs)) return;

  try {
    await singUp(
      email.value,
      password.value,
      nikname.value,
      name.value,
      surname.value,
      phone.value,
      sex.value,
      city.value,
      country.value,
      getBirthday(birthday.value)
      );

    formSing.reset();
    notify({ msg: 'SingUp success', className: 'alert-success' });
  } catch (err) {
    notify({ mas: 'SingUp faild', className: 'alert-danger' });
  }
}

function getBirthday(data){
  const birthData = data.split('-');
  return {
    date_of_birth_day: birthData[0],
    date_of_birth_month: birthData[1],
    date_of_birth_year: birthData[2]
  }
}
function checkValidation(inputs){
  const isValidForm = inputs.every(el => {
    const isValidInput = validate(el);
    if (!isValidInput) {
      showInputError(el);
    }
    return isValidInput;
  });
  return isValidForm;
}