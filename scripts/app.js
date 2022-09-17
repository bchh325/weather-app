import { getDetails } from "./weatherapi.js";

const zipForm = document.querySelector('form');
const input = document.querySelector('input');
const details = document.querySelector('.details');
const card = document.querySelector('.card');
const iconImg = document.querySelector('.icon img');
const timeImg = document.querySelector('img.time')

input.oninput = function () {
    if (this.value.length > 5) {
        this.value = this.value.slice(0, 5);
    }
}

const changeDetails = (data) => {
    // const dets = data.details;
    // const weather = data.weather;

    //Destructuring does the same as above

    const {dets, weather} = data;


    console.log(dets);
    console.log(weather);

    details.innerHTML = `<h5 class="my-3">${dets.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${weather.Temperature.Imperial.Value}</span>
        <span>&deg;F</span>
    </div>`;

    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    } 

    iconImg.src = `./icons/${weather.WeatherIcon}.svg`;

    // if (weather.IsDayTime) {
    //     timeImg.src = `./icons/day.svg`;
    // } else {
    //     timeImg.src = `./icons/night.svg`;
    // }
    
    //Ternary Operator

    //const result = condition ? 'value 1' : 'value 2';
    const timeResult = (weather.IsDayTime ? `./icons/day.svg` : `./icons/night.svg`);
    timeImg.src = timeResult;

}

zipForm.addEventListener('submit', event => {
    event.preventDefault();
    if (input.value.trim().length === 5) {
        const zip = input.value.trim();
        getDetails(zip)
        .then(data => {
            changeDetails(data);
        });
    }
    zipForm.reset();
})

