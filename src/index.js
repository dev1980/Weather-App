import './style.css';

const cityInput = document.querySelector('.cityInput');
const button = document.querySelector('.button');

const city = document.querySelector('.city');
const temp = document.querySelector('.temp');
const tempHigh = document.querySelector('.tempHigh');
const tempLow = document.querySelector('.tempLow');
const wind = document.querySelector('.wind');
const cloud = document.querySelector('.cloud');

button.addEventListener('click', function(){
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityInput.value + '&appid=80068fbfc8f92310ac9ea24006b4d8f7')
    .then(response => response.json())
    .then(data => {
        const cityName = data['name'];
        const tempValue = data['main']['temp'];
        const tempHighValue = data['main']['temp_max'];
        const tempLowValue = data['main']['temp_min'];
        const windValue = data['wind']['speed'];
        const cloudValue = data['clouds']['all'];
       

        city.innerHTML = cityName;
        temp.innerHTML = tempValue;
        tempHigh.innerHTML = tempHighValue;
        tempLow.innerHTML = tempLowValue;
        wind.innerHTML = windValue;
        cloud.innerHTML = cloudValue;
        
    })
    
    .catch(error => alert("Wrong city name"))
})
