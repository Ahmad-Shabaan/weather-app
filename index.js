let targetCity = document.getElementById("city");
let cityName = document.getElementById("cityName");
let temp = document.getElementById("temp");
let humidity = document.querySelector(".humidity");
let wind = document.querySelector(".wind");
let err = document.getElementById("error");
let weatherIcon = document.querySelector("#weatherIcon");

async function fetchData(city) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=aac4303f6c329fdc894cd12485cd6103&units=metric`
  );
  if (res.status == 404) {
    err.style.display = "block";
    document.querySelector("#weatherData").style.display = "none";
  } else {
    const data = await res.json();
    document.querySelector("#weatherData").style.display = "block";
    err.style.display = "none";

    temp.innerHTML = Math.round(data.main["temp"]) + "°C";
    cityName.innerHTML = data.name;
    humidity.innerHTML = data.main["humidity"] + "%";
    wind.innerHTML = data.wind["speed"] + "km/h";
    if (data.weather[0].main === "Clouds") {
      weatherIcon.setAttribute("icon", "bi:clouds");
    } else if (data.weather[0].main === "Clear") {
      weatherIcon.setAttribute("icon", "material-symbols-light:wb-sunny");
    } else if (data.weather[0].main === "Rain") {
      weatherIcon.setAttribute("icon", "mdi:weather-lightning-rainy");
    } else if (data.weather[0].main === "Drizzle") {
      weatherIcon.setAttribute("icon", "mdi:weather-partly-rainy");
    } else if (data.weather[0].main === "Mist") {
      weatherIcon.setAttribute("icon", "ion:partly-sunny-outline");
    }
  }
}

document.querySelector("#search").addEventListener("click", () => {
  fetchData(targetCity.value);
});
