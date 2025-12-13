



// function runOnHourChange(fn) {
//   let lastHour = new Date().getHours();

//   function checkHour() {
//     const now = new Date();
//     const currentHour = now.getHours();

//     if (currentHour !== lastHour) {
//       lastHour = currentHour;
//       fn(now);
//     }

//     requestAnimationFrame(checkHour);
//   }

//   checkHour();
// }

// /* usage */
// runOnHourChange((time) => {
//   console.log("Hour changed:", time.toLocaleTimeString());
//   // call weather refresh here
// });




if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(
    position => {
      console.log("Location allowed:", position.coords);
      getForecast(position.coords.latitude, position.coords.longitude)
    //   establish(position.coords.latitude, position.coords.latitude)
    },
    error => {
      if (error.code === error.PERMISSION_DENIED) {
        alert("Please allow location access to get weather data.");
      }
    }
  );
} else {
  alert("Geolocation not supported in this browser.");
}

function convertToFahrenheit(celsius) {
  return (celsius * 9/5) + 32;
}

function getForecast(lat, lon) {
  const url =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${lat}&longitude=${lon}` +
    `&daily=temperature_2m_max,temperature_2m_min,weathercode` +
    `&timezone=auto`;

  fetch(url)
    .then(r => r.json())
    .then(data => handleForecast(data))
    .catch(err => console.error(err));
}

function handleForecast(data) {
  const days = data.daily.time;
  const max = data.daily.temperature_2m_max;
  const min = data.daily.temperature_2m_min;
  const code = data.daily.weathercode;

  const minTemps = []
  const maxTemps = []

  for (let i = 0; i < 7; i++) {
    minTemps[i] = convertToFahrenheit(data.daily.temperature_2m_min[i])
    maxTemps[i] = convertToFahrenheit(data.daily.temperature_2m_max[i])
  }
  const temp1 = document.getElementById("temp1");
  temp1.innerHTML = minTemps[0]
  console.log(data, minTemps, maxTemps)

//   return {
//     min: data.temperature_2m_min,
//     max: data.temperature_2m_max
//   }
  console.log(days[0], max[0], min[0], code[0]);
}

