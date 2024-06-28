const pages = ["template1.html","template2.html","template3.html","template4.html","template5.html","template6.html","template7.html","template8.html","template9.html","template10.html","template11.html","template12.html","template14.html"];    // <----- ici c'est les différentes pages .Pour en rajouter une a l'appli , il suffit de rajouter après "template12.html" une virgule puis rajouter des guillemets avec a l'interieur le nom de votre page et rajoutant bien << .html >> a la fin : "template-le_Numero_Suivant_De_La_Page.html" 

const tempsEntreLesPages = 20;  // <---- temps d'affichage entre différentes pages , 20sec = 20000, 10sec= 10000 etc (unité:millisecondes)

const lienRepo = "./les différentes pages/";

let currentPage = 0;

function loadPage(lienPage) {

    fetch(lienRepo + lienPage)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }   
        return response.text();
    })
    .then(data => {
        document.getElementById('content').innerHTML = data;
    })
        .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

setInterval(() => {
    currentPage = (currentPage + 1) % pages.length;
    loadPage(pages[currentPage]);
}, tempsEntreLesPages*100);       

function updateDateTime() {
    const now = new Date();
    const options = { timeZone: 'Europe/Paris', hour12: false, weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const timeOptions = { timeZone: 'Europe/Paris', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    document.getElementById('current-date').textContent = now.toLocaleDateString('fr-FR', options);
    document.getElementById('current-time').textContent = now.toLocaleTimeString('fr-FR', timeOptions);
}

setInterval(updateDateTime, 1000);

async function fetchWeather() {
    const apiKey = 'e650f13b233f632921520ecdbe493a1e';
    const city = 'Luxembourg';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=fr`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Weather data not available');
        }
        console.log("reponse " + response);
        const weatherData = await response.json();
        console.log(weatherData);
        const description = weatherData.weather[0].description;
        const temp = weatherData.main.temp;

        const imgWeather = document.getElementById('weatherIconId');
        if (description.toLowerCase().includes("nuageux"))
            imgWeather.src="./Img_météo/cloud.png";
        else if (description.toLowerCase().includes("pluie"))
            imgWeather.src="./Img_météo/rain-cloud.png";
        else if (description.toLowerCase().includes("ciel dégagé"))
            imgWeather.src="./Img_météo/sun.png";
        else if (description.toLowerCase().includes("neige"))
            imgWeather.src="./Img_météo/snow.png";
        else if (description.toLowerCase().includes("tonner"))
            imgWeather.src="./Img_météo/thunderstorm.png";
        else
            imgWeather.src="./Img_météo/cloud.png";

        if (temp <= 15) 
        {
            document.getElementById("temperature").style.color = "blue";
        }
        else 
        {
            document.getElementById("temperature").style.color = "red";
        }
            
        document.getElementById('weather-description').textContent = description.charAt(0).toUpperCase() + description.slice(1);
        document.getElementById('temperature').textContent = `${temp.toFixed(1)}°C`;
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

fetchWeather();
setInterval(fetchWeather, 600000); // Update weather every 60 minutes

// Initial page load
loadPage(pages[0]);
updateDateTime();






// <!-- Créé par Riff Clément (16) élève de 2nd Gen stagiaire du 17/06/2024 au 28/06/2024   -->