import './style.css';

let cityInput = document.querySelector('.cityInput');
let button = document.querySelector('.button');

let date = document.querySelector('.date');
let city = document.querySelector('.city');
let temp = document.querySelector('.temp');
let tempHigh = document.querySelector('.tempHigh');
let tempLow = document.querySelector('.tempLow');
let wind = document.querySelector('.wind');
let humidity = document.querySelector('.humidity');
let cloud = document.querySelector('.cloud');

button.addEventListener('click', function(){
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityInput.value + '&appid=80068fbfc8f92310ac9ea24006b4d8f7')
    .then(response => response.json())
    .then(data => 
        console.log(data)
    )
    
    .catch(error => alert("Wrong city name"))
})
