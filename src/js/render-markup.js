import { formRef, listRef, boxRef } from '/js/refs';

export function renderMarkup(data) {
  let markup = {};
  if (data.length > 10) {
    return Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
  }
  if ((data.length > 2) & (data.length < 10)) {
    markup = data
      .map(data => {
        return `<li class ="list">  <img  src="${data.flags.svg}" alt="flag" class="img" > <p> ${data.name.official}  </p> </li>
            `;
      })
      .join('');
    listRef.innerHTML = markup;
  }

  if (data.length === 1) {
    const languages = Object.values(data[0].languages).join(', ');
    markup = data
      .map(data => {
        return `
            <div class="wrapper">
            <img  src="${data.flags.svg}" alt="flag" class="img" >
            <p class="official_name"> ${data.name.official}  </p>
             </div>
            <ul>
            <li class ="country_list"> <span class="span_name">Capital:</span> <p class = "country_list-name">${data.capital} </p></li>
            <li class ="country_list"> <span  class="span_name">Population:</span><p class = "country_list-name" > ${data.population}</p </li>
            <li class ="country_list"> <span class="span_name"> Languages:</span><p class = "country_list-name" > ${languages}</p> </li> </ul>
            `;
      })
      .join('');

    boxRef.innerHTML = markup;
    formRef.value = '';
  }
}
