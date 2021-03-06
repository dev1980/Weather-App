import './style.css';
import image from '../image/cloud.jpg';

const btnCity = document.getElementById('btnCity');
const txtCity = document.getElementById('txtCity');
const btnCelsius = document.getElementById('btnCelsius');
const btnFahren = document.getElementById('btnFahren');
const location = document.getElementById('location');
const changeTemp = document.getElementById('changeTemp');
const humidity = document.getElementById('humidity');
const pressure = document.getElementById('pressure');
const wind = document.getElementById('wind');
const weather = document.getElementById('weather');
const imgGif = document.getElementById('imgGif');

const displayImage = (gifyimage) => {
  fetch(`https://api.giphy.com/v1/gifs/translate?api_key=tF7lrMLP7aaUUr1PIcT4fubRikdBCMWU&s=${gifyimage}%20cloudy`)
    .then(response => response.json())
    .then((response) => {
      imgGif.src = response.data.images.original.url;
    })
    .catch((error) => {
      document.querySelector('error').style.display = 'block';
      document.querySelector('error').innerHTML = error;
    });
};

imgGif.src = image;

let data;
btnCity.onclick = () => {
  const city = txtCity.value;
  const KEY = '3200d53ac65b442eb5f439f5613ee06c';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${KEY}`;
  fetch(url).then(response => {
    response.json().then(json => {
      data = json;
      getResponse(data);

      const gifyimage = data.weather[0].main;
      displayImage(gifyimage.toLowerCase());
    });
  });
};

const kToC = (kTemp) => {
  const cTemp = kTemp - 273.15;
  return cTemp;
};

const getResponse = (data) => {
  let conditions = '';
  if (data.weather.length > 1) {
    for (let i = 0; i < data.weather.length; i += 1) {
      conditions += data.weather[i].main;
      if (i !== (data.weather.length - 1)) {
        conditions += ' and ';
      }
    }
  } else {
    conditions += data.weather[0].main;
  }
  location.innerHTML = `Current weather condition for ${data.name}`;
  changeTemp.innerHTML = `${Math.round(kToC(data.main.temp))} °C`;
  humidity.innerHTML = `${data.main.humidity}%`;
  pressure.innerHTML = `${data.main.pressure}mb`;
  wind.innerHTML = `${data.wind.deg} degrees at ${(data.wind.speed)}ms`;
  weather.innerHTML = `${conditions}`;
};

btnCelsius.addEventListener('click', () => {
  const cels = Math.round(kToC(data.main.temp));
  changeTemp.innerHTML = `${cels} °C`;
});

btnFahren.addEventListener('click', () => {
  const cels = Math.round(kToC(data.main.temp));
  const fahren = (cels * (9 / 5)) + 32;
  changeTemp.innerHTML = `${fahren} °F`;
});