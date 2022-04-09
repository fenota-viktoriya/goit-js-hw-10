import './css/styles.css';
import debounce from 'lodash.throttle';
import Notiflix from 'notiflix';

const BASE_URL = 'https://restcountries.com/v3.1/name/';


const DEBOUNCE_DELAY = 300;

const formRef = document.querySelector('#search-box')
const listRef = document.querySelector('.country-list')
const boxRef = document.querySelector('.country-info')


formRef.addEventListener('input',debounce(onInput,DEBOUNCE_DELAY));



function onInput() {
 
 const text = formRef.value.trim();
    
listRef.innerHTML ='';
boxRef.innerHTML = '';

    if(!text){

        return;
    }
    
    fetchCountryByName(text).then(data => renderList(data)).catch(error => {
        return Notiflix.Notify.failure('Oops, there is no country with that name');
      
    });

};



function renderList(data){
let markup = {};
if (data.length >10){
    return Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
}
if(data.length >2 & data.length < 10){
     markup = data.map(data=>{
        return`<li class ="list">  <img  src="${data.flags.svg}" alt="flag" class="img" > <p> ${data.name.official }  </p> </li>
        `
    }).join('');
    listRef.innerHTML = markup;};
     
    if( data.length === 1){
        const languages = Object.values(data[0].languages).join(', ');
     markup = data.map(data=>{
        return`
        <div class="wrapper">
        <img  src="${data.flags.svg}" alt="flag" class="img" >
        <p class="official_name"> ${data.name.official }  </p>
         </div>
        <ul>
        <li class ="country_list"> <span class="span_name">Capital:</span> <p class = "country_list-name">${data.capital } </p></li>
        <li class ="country_list"> <span  class="span_name">Population:</span><p class = "country_list-name" > ${data.population}</p </li>
        <li class ="country_list"> <span class="span_name"> Languages:</span><p class = "country_list-name" > ${languages}</p> </li> </ul>
        `
    } ).join('');
    console.log(data)

    boxRef.innerHTML = markup;
    }
}

 function fetchCountryByName(name) {
  return fetch(`${BASE_URL}/${name}?fields=name,capital,population,flags,languages`).then(response => {
    if (!response.ok) {
      throw Error(response.statusText);
    }

    return response.json();
    
  });

}





