
document.getElementById('scrollButton').addEventListener('click', function() {
    document.getElementById('search').scrollIntoView({ behavior: 'smooth' });
    const rain = document.getElementById('rain');
    const boy = document.getElementById('boy');
    boy.classList.add('anim');
    rain.classList.add('anim2');
});



document.getElementById('searchButton').addEventListener('click', function() {
    const city = document.getElementById('search').value;
    const apiKey = '235b2d8be38f25318b8472a88f5bf0d4';
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    const modal = document.getElementById('modal');

    const body = document.querySelector('body');
    body.classList.add('scroll-lock');

    const chexbox = document.getElementById('cbx-46');

    if (chexbox.checked) {
        // Получение прогноза погоды на 5 дней
    modal.classList.remove('weather');
    modal.classList.add('forecast');

    fetch(forecastUrl)
    .then(response => response.json())
    .then(data => {
        const forecastInfo = document.createElement('div');
        forecastInfo.classList.add('forecast-info');
        forecastInfo.innerHTML = '<h3>5 Day / 3 Hour Forecast</h3>';
        data.list.forEach(forecast => {
            const forecastItem = document.createElement('div');
            forecastItem.classList.add('forecast-item');
            forecastItem.innerHTML = `
                <p><strong>${new Date(forecast.dt_txt).toLocaleString()}</strong></p>
                <p>Temperature: ${forecast.main.temp}°C</p>
                <p>Weather: ${forecast.weather[0].description}</p>
                <p>Humidity: ${forecast.main.humidity}%</p>
                <p>Wind Speed: ${forecast.wind.speed} m/s</p>
            `;
            forecastInfo.appendChild(forecastItem);
        });
        document.getElementById('weatherInfo').appendChild(forecastInfo);
    })
    .catch(error => {
        console.error('Error fetching forecast data:', error);
    }); 
    } else {
        // Получение текущей погоды
    fetch(weatherUrl)
    .then(response => response.json())
    .then(data => {
        const weatherInfo = document.getElementById('weatherInfo');
        if (data.cod === 200) {
            weatherInfo.innerHTML = `
                <h2>${data.name}, ${data.sys.country}</h2>
                <p>Temperature: ${data.main.temp}°C</p>
                <p>Weather: ${data.weather[0].description}</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Wind Speed: ${data.wind.speed} m/s</p>
            `;
        } else {
            weatherInfo.innerHTML = `<p>${data.message}</p>`;
        }
    })
    .catch(error => {
        console.error('Error fetching weather data:', error);
    });
    }
    

    


    modal.showModal();

    const closeButton = document.getElementById('closeButton');
    closeButton.addEventListener('click', () => {
        body.classList.remove('scroll-lock');
        weatherInfo.innerHTML = '';
        modal.classList.remove('forecast');
        modal.classList.add('weather');
        modal.close();
    });
});

document.getElementById('scrollTopButton').addEventListener('click', function() {
    document.getElementById('head').scrollIntoView({ behavior: 'smooth' });
});