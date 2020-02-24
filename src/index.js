import './style.css';

const btnCity = document.getElementById('btnCity');
const txtCity = document.getElementById('txtCity');
const imgGif = document.getElementById('imgGif');
const weatherResult = document.getElementById('weatherResult');
const btnCelsius = document.getElementById('btnCelsius');
const btnFahren = document.getElementById('btnFahren');
const changeTemp = document.getElementById('changeTemp');

const displayImage = () => {
  fetch('https://api.giphy.com/v1/gifs/random?api_key=UATrdJQ14gXYSQb46ecz4AExyXbN27Qn&tag=&rating=G')
    .then(response => response.json())
    .then((response) => {
      document.querySelector('img').src = response.data.images.original.url;
    })
    .catch((error) => {
      document.querySelector('error').style.display = 'block';
      document.querySelector('error').innerHTML = error;
    });
};

imgGif.innerHTML = displayImage();

let data;
btnCity.onclick = function () {
  const city = txtCity.value;
  const KEY = '3200d53ac65b442eb5f439f5613ee06c';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${KEY}`;
  fetch(url).then(response => {
    response.json().then(json => {
      data = json;
      getResponse(data)
    });
  });
};

function kToF(kTemp) {
  const fTemp = kTemp * (9 / 5) - 459.67;
  return fTemp;
}

function msToMPH(ms) {
  return ms * 2.237;
}

const getResponse = (data) => {
  let conditions = '';
  if (data.weather.length > 1) {
    for (let i = 0; i < data.weather.length; i++) {
      conditions += data.weather[i].main;
      if (i != (data.weather.length - 1)) {
        conditions += ' and ';
      }
    }
  } else {
    conditions += data.weather[0].main;
  }
  const urlString = `<p><strong>Current weather condition for ${data.name}</strong></p>
    <p><strong>Temperature:</strong> <span id="changeTemp"></span></p>
    <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
    <p><strong>Pressure:</strong> ${data.main.pressure}mb</p>
    <p><strong>Wind:</strong> ${data.wind.deg} degrees at ${Math.round(msToMPH(data.wind.speed))}</p>
    <p><strong>Weather:</srong>${conditions}</p>`;
    weatherResult.innerHTML = urlString;
};

// document.addEventListener('DOMContentLoaded', () =>{
//   getResponse(data)
// })


btnCelsius.addEventListener('click', () => {
  const faren = Math.round(kToF(data.main.temp));
  // const cels = (faren - 32) * 5 / 9;
  // console.log(cels);
  changeTemp.innerText = 'Hellow';
  console.log(data.main.temp);
});

// btnFahren.addEventListener('click', () => {
//   const faren = Math.round(kToF(data.main.temp));
//   tempDisplay = `${faren}°F`;
// });
