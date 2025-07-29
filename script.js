const apiKey = "8f1351bca97f184c69d42babd16e0cbe"; // Your actual API key

function getWeather() {
  const city = document.getElementById("cityInput").value;
  const spinner = document.getElementById("spinner");
  const result = document.getElementById("weatherResult");

  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  // 👉 Show spinner
  spinner.style.display = "block";
  result.innerHTML = ""; // Clear previous results

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then((data) => {
      const weather = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>🌡️ Temperature: ${data.main.temp} °C</p>
        <p>🌤️ Weather: ${data.weather[0].main} (${data.weather[0].description})</p>
        <p>💧 Humidity: ${data.main.humidity}%</p>
        <p>🌬️ Wind Speed: ${data.wind.speed} m/s</p>
      `;
      result.innerHTML = weather;
    })
    .catch((error) => {
      result.innerHTML = "❌ Error: " + error.message;
    })
    .finally(() => {
      // 👉 Hide spinner after success or error
      spinner.style.display = "none";
    });
}
