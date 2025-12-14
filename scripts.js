



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
    `&daily=temperature_2m_max,temperature_2m_min,weathercode,precipitation_probability_max` +
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
  const rainChances = []
  const startDay = Date()
  let startingOffset = 0
  const weekDayBase = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  for (let i = 0; i < 7; i++) {
    let correctLetters = 0
    for (let j = 0; j < 2; j++) {
        console.log(weekDayBase[i][j],startDay[j])
        if (weekDayBase[i][j] == startDay[j]) {
            correctLetters += 1
        }
    }
    if (correctLetters == 2) {
        startingOffset = i
        break
    }
  }
//   console.log(startDay, startingOffset)
//   const allDays = document.getElementsByClassName("tempature");


  for (let i = 0; i < 7; i++) {
    minTemps[i] = convertToFahrenheit(data.daily.temperature_2m_min[i])
    maxTemps[i] = convertToFahrenheit(data.daily.temperature_2m_max[i])
    rainChances[i] = data.daily.precipitation_probability_max[i]

    let name = document.getElementById("name" + (i+1))
    let min = document.getElementById("min" + (i+1))
    let max = document.getElementById("max" + (i+1))
    let rain = document.getElementById("rain" + (i+1))
    min.innerHTML = minTemps[i].toFixed(1)
    max.innerHTML = maxTemps[i].toFixed(1)
    rain.innerHTML = rainChances[i].toFixed(1) + "%"
    name.innerHTML = weekDayBase[(startingOffset + i) % 7]
    // allDays[i].innerHTML = minTemps[i]
    // allDays[i].innerHTML = maxTemps[i]
  }
  
//   console.log(allDays);
//   console.log(data, minTemps, maxTemps);
  //console.log(days[0], max[0], min[0], code[0]);

}





const container = document.querySelector('.fog-container');
const NUM_CIRCLES = 500; // increased for deeper fog
let fogSpaces = document.getElementsByClassName("fog-container")
for (let k = 0; k < fogSpaces.length; k++) {
    for (let i = 0; i < NUM_CIRCLES; i++) {
    const circle = document.createElement('div');
    circle.classList.add('fog-circle');

    // random size (slightly larger for dense fog)
    const size = Math.random() * 120 + 50; // 50px - 170px
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;

    // random position
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    circle.style.left = `${x}%`;
    circle.style.top = `${y}%`;

    // random animation delay
    circle.style.animationDelay = `${Math.random() * 10}s`;

    fogSpaces[k].appendChild(circle);
    }
}