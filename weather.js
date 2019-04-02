const weather = document.querySelector(".js-weather");
const API_KEY = "ef1703fa8761c3470326da7d816c299c";
const COORDS = 'coords';

function getWether(lat, lng) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
    .then(function(response) {
       return response.json();
    })
    .then(function(json) {
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature} °C  in ${place}`
    })
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWether(latitude, longitude);
}

function handleGeoError() {
    console.log('cant access geo location')
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null) {
        askForCoords();
    } else {
        //getWether
        const parseCoords = JSON.parse(loadedCoords);
        // console.log(parseCoords)
        getWether(parseCoords.latitude, parseCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init();