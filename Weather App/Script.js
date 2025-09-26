class WeatherApp {
  constructor() {
    this.apiKey = "YOUR_API_KEY_HERE";
    this.apiUrl = "https://api.openweathermap.org/data/2.5/weather";
    this.initializeElements();
    this.bindEvents();
    this.weatherIcons = this.getWeatherIcons();
  }

  initializeElements() {
    this.searchForm = document.getElementById("search-form");
    this.cityInput = document.getElementById("city-input");
    this.errorContainer = document.getElementById("error-container");
    this.weatherDisplay = document.getElementById("weather-display");
    this.weatherIcon = document.getElementById("weather-icon");
    this.temperature = document.getElementById("temperature");
    this.cityName = document.getElementById("city-name");
    this.humidity = document.getElementById("humidity");
    this.windSpeed = document.getElementById("wind-speed");
  }

  bindEvents() {
    this.searchForm.addEventListener(
      "submit",
      this.handleFormSubmit.bind(this)
    );
    this.cityInput.addEventListener("input", this.handleInputChange.bind(this));
  }

  getWeatherIcons() {
    return {
      "01d": "./images/clear.png",
      "01n": "./images/clear.png",
      "02d": "./images/clouds.png",
      "02n": "./images/clouds.png",
      "03d": "./images/clouds.png",
      "03n": "./images/clouds.png",
      "04d": "./images/drizzle.png",
      "04n": "./images/drizzle.png",
      "09d": "./images/rain.png",
      "09n": "./images/rain.png",
      "10d": "./images/rain.png",
      "10n": "./images/rain.png",
      "11d": "./images/rain.png",
      "11n": "./images/rain.png",
      "13d": "./images/snow.png",
      "13n": "./images/snow.png",
      "50d": "./images/mist.png",
      "50n": "./images/mist.png",
    };
  }

  async handleFormSubmit(event) {
    event.preventDefault();

    const cityName = this.cityInput.value.trim();
    if (!cityName) {
      this.showError();
      return;
    }

    this.hideError();

    try {
      const weatherData = await this.fetchWeatherData(cityName);
      this.displayWeatherData(weatherData);
      this.showWeatherDisplay();
    } catch (error) {
      this.showError();
      this.hideWeatherDisplay();
    }
  }

  async fetchWeatherData(city) {
    const url = `${this.apiUrl}?q=${encodeURIComponent(city)}&appid=${
      this.apiKey
    }&units=metric`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  }

  displayWeatherData(data) {
    const temp = Math.round(data.main.temp);
    const iconCode = data.weather[0].icon;
    const iconSrc = this.weatherIcons[iconCode] || "./images/clear.png";
    const windKmh = Math.round(data.wind.speed * 3.6);

    this.temperature.textContent = `${temp}°C`;
    this.cityName.textContent = data.name;
    this.humidity.textContent = `${data.main.humidity}%`;
    this.windSpeed.textContent = `${windKmh} km/h`;
    this.weatherIcon.src = iconSrc;
    this.weatherIcon.alt = data.weather[0].description;
  }

  handleInputChange() {
    if (!this.errorContainer.classList.contains("hidden")) {
      this.hideError();
    }
  }

  showError() {
    this.errorContainer.classList.remove("hidden");
  }

  hideError() {
    this.errorContainer.classList.add("hidden");
  }

  showWeatherDisplay() {
    this.weatherDisplay.classList.remove("hidden");
  }

  hideWeatherDisplay() {
    this.weatherDisplay.classList.add("hidden");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new WeatherApp();
});
