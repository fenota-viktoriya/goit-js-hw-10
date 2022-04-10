import './css/styles.css';
import debounce from 'lodash.throttle';
import Notiflix from 'notiflix';
import { fetchCountryByName } from './js/fetch-countries';
import { formRef, listRef, boxRef } from './js/refs';
import { renderMarkup } from './js/render-markup';

const DEBOUNCE_DELAY = 300;

formRef.addEventListener('input', debounce(onInputText, DEBOUNCE_DELAY));

function onInputText() {
  const text = formRef.value.trim();

  listRef.innerHTML = '';
  boxRef.innerHTML = '';
  if (!text) {
    return;
  }

  fetchCountryByName(text)
    .then(data => renderMarkup(data))
    .catch(error => {
      return Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}
