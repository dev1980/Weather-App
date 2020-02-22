import './style.css';

const displayGif = () => {
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

const api = {
  key: '80068fbfc8f92310ac9ea24006b4d8f7',
  base: 'http://api.openweathermap.org/data/2.5/',
};

const inputValue = document.querySelector('.inputValue');
inputValue.addEventListener('keypress', setQuery);

function setQuery(e) {
  if (e.keyCode === 13) {
    getResults(inputValue.value);
  }
}

function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => weather.json()).then(displayResults);
}

function clearForm() {
  setTimeout(() => {
    inputValue.value = '';
  }, 3000);
}

function displayResults(weather) {
  const city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  const now = new Date();
  const date = document.querySelector('.location .date');
  date.innerText = newDate(now);

  const temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  const weatherNew = document.querySelector('.current .weather');
  weatherNew.innerText = weather.weather[0].main;

  const hilow = document.querySelector('.hi-low');
  hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
  displayGif();
  clearForm();
  
}


function newDate(d) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const day = days[d.getDay()];
  const date = d.getDate();
  const month = months[d.getMonth()];
  const year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
