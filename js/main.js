var inputSearch = document.getElementById("inputSearch");
var btnHome = document.getElementById("btnHome");
var btnContact = document.getElementById("btnContact");
var thisDay = document.getElementById("thisDay");
var secondDay = document.getElementById("secondDay");
var therdyDay = document.getElementById("therdyDay");

navigator.geolocation.getCurrentPosition(
  function (position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;

    getCurrentLocationData(lat, lon);
  },
  function (error) {
    console.error("Error: " + error.message);
  }
);

inputSearch.addEventListener("keydown", function (e) {
  getSearchLocationData(inputSearch.value);
});

async function getCurrentLocationData(lat, log) {
  try {
    var url = `https://api.weatherapi.com/v1/forecast.json?key=d2e8a92ef6914bfdbe5112030252306&q=${
      (lat, log)
    }&days=3`;
    var response = await fetch(url);
    var data = await response.json();
    creatData(data);
  } catch (err) {
    console.log(err);
  }
}

async function getSearchLocationData(value) {
  try {
    var url = `https://api.weatherapi.com/v1/forecast.json?key=d2e8a92ef6914bfdbe5112030252306&q=${value}&days=3`;
    var response = await fetch(url);
    var data = await response.json();
    creatData(data);
  } catch (err) {
    console.log(err);
  }
}

function creatData(data) {
  var date1 = new Date(data.location.localtime);
  var date2 = new Date(data.forecast.forecastday[1].date);
  var date3 = new Date(data.forecast.forecastday[2].date);
  console.log(date1);
  console.log(date2);
  console.log(date3);
  var day = {
    locationName: data.location.name,
    dayString: date1.toDateString().split(" ", 3)[0],
    month: date1.toDateString().split(" ", 3)[1],
    dayNumber: date1.toDateString().split(" ", 3)[2],
    temp: data.current.temp_c,
    mood: data.current.condition.text,
    icon: data.current.condition.icon,
  };
  var nextDay = {
    locationName: data.location.name,
    dayString: date2.toDateString().split(" ", 3)[0],
    month: date2.toDateString().split(" ", 3)[1],
    dayNumber: date2.toDateString().split(" ", 3)[2],
    tempMax: data.forecast.forecastday[1].day.maxtemp_c,
    tempMin: data.forecast.forecastday[1].day.mintemp_c,
    mood: data.forecast.forecastday[1].day.condition.text,
    icon: data.forecast.forecastday[1].day.condition.icon,
  };
  var thirdDay = {
    locationName: data.location.name,
    dayString: date3.toDateString().split(" ", 3)[0],
    month: date3.toDateString().split(" ", 3)[1],
    dayNumber: date3.toDateString().split(" ", 3)[2],
    tempMax: data.forecast.forecastday[2].day.maxtemp_c,
    tempMin: data.forecast.forecastday[2].day.mintemp_c,
    mood: data.forecast.forecastday[2].day.condition.text,
    icon: data.forecast.forecastday[2].day.condition.icon,
  };

  displayCurrentData(day);
  displaySecondData(nextDay);
  displayThirdData(thirdDay);
}

function displayCurrentData(obj) {
  var cartona = ``;
  cartona += `
  
              <div
                class="bg-title text-light text-opacity-50 d-flex justify-content-between pt-2 pb-0 px-2"
              >
                <p>${obj.dayString}</p>
                <p>${obj.dayNumber + obj.month}</p>
              </div>
              <div class="bg-bodyy px-3 py-4">
                <div class="text-light text-opacity-50">
                  <p id="vip">${obj.locationName}</p>
                </div>
                <div
                  class="d-flex flex-lg-column justify-content-around align-items-lg-start"
                >
                  <p id="big">${obj.temp}<sup>o</sup>C</p>
                  <img src="https:${obj.icon}" alt="sun" class="image-width" />
                </div>
                <div>
                  <span class="vip-span">${obj.mood}</span>
                </div>
                <div class="d-flex text-light text-opacity-50 mt-3">
                  <div>
                    <img src="image/icon-umberella.png" alt="" />
                    <span>20%</span>
                  </div>
                  <div class="ms-4">
                    <img src="image/icon-wind.png" alt="" />
                    <span>18km/h</span>
                  </div>
                  <div class="ms-4">
                    <img src="image/icon-compass.png" alt="" />
                    <span>East</span>
                  </div>
                </div>
              </div>
            
  `;
  thisDay.innerHTML = cartona;
}
function displaySecondData(obj) {
  var cartona = ``;
  cartona += `
              <div class="vip-bg-title text-light text-opacity-50 py-1">
                <p>${obj.dayString}</p>
              </div>
              <div class="vip-bg-bodyy py-5">
                <img src="https:${obj.icon}" alt="sun" />
                <div class="mt-2">
                  <p class="text-light" id="vip-p">${obj.tempMax}<sup>o</sup>C</p>
                  <span class="text-light opacity-50">${obj.tempMin}<sup>o</sup></span>
                </div>
                <div class="mt-3">
                  <span class="vip-span">${obj.mood}</span>
                </div>
              </div>
  `;

  secondDay.innerHTML = cartona;
}
function displayThirdData(obj) {
  var cartona = ``;
  cartona += `
             <div class="bg-title text-light text-opacity-50 py-1">
                <p>${obj.dayString}</p>
              </div>
              <div class="bg-bodyy py-5">
                <img src="https:${obj.icon}" alt="sun" />
                <div class="mt-2">
                  <p class="text-light" id="vip-p">${obj.tempMax}<sup>o</sup>C</p>
                  <span class="text-light opacity-50">${obj.tempMin}<sup>o</sup></span>
                </div>
                <div class="mt-3">
                  <span class="vip-span">${obj.mood}</span>
                </div>
              </div>
  `;

  therdyDay.innerHTML = cartona;
}
