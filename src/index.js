import './style.css';

const btnCity = document.getElementById('btnCity');
const txtCity = document.getElementById('txtCity');
const imgGif = document.getElementById('imgGif');
const weatherResult = document.getElementById('weatherResult');
const btnCelsius = document.getElementById('btnCelsius');
const btnFahren = document.getElementById('btnFahren');
// const displayImage = () => {
//     fetch(`https://api.giphy.com/v1/gifs/random?api_key=UATrdJQ14gXYSQb46ecz4AExyXbN27Qn&tag=&rating=G`)
//     .then(response => response.json())
//     .then((response) => {
//       document.querySelector('img').src = response.data.images.original.url;
//     })
//     .catch((error) => {
//       document.querySelector('error').style.display = 'block';
//       document.querySelector('error').innerHTML = error;
//     });
// };

// imgGif.innerHTML = displayImage();

btnCity.onclick = function () {
  const city = txtCity.value;
  const KEY = '3200d53ac65b442eb5f439f5613ee06c';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${KEY}`;
  fetch(url).then(response => {
    response.json().then(json => {
      const data = json;
      const output = getResponse(data);
      weatherResult.innerHTML = output;
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

btnCelsius.addEventListener('click', () => {
  const faren = Math.round(kToF(data.main.temp)) - 273.15;
  const cels = (faren - 32) * 5 / 9;
  tempDisplay = `${cels}°C`;
});

btnFahren.addEventListener('click', () => {
  const faren = Math.round(kToF(data.main.temp)) - 273.15;
  tempDisplay = `${faren}°F`;
});


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
    <p><strong>Temperature:</strong> ${tempDisplay}<br /></p>
    <p><strong>Humidity:</strong> ${data.main.humidity}%<br /></p>
    <p><strong>Pressure:</strong> ${data.main.pressure}mb<br /></p>
    <p><strong>Wind:</strong> ${data.wind.deg} degrees at ${Math.round(msToMPH(data.wind.speed))}</p>
    <p><strong>Weather:</srong>${conditions}</p>`;
  return (urlString);
};
