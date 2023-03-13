const API_KEY = 'b2743dbe9fecf85b38dea8364a39e696'

const userWeather = document.querySelector("[data-user-weather]")
const searchWeather = document.querySelector("[data-search-weather]")

const searchForm = document.querySelector("[data-search-form]")
const userLocation = document.querySelector("[data-user-location]")
const weatherDisplay = document.querySelector("[data-weather-show]")
const loading = document.querySelector("[data-loading]")

const accessBtn = document.querySelector("[data-grant-access]")

const searchCity = document.querySelector("[search-city]")

const error = document.querySelector("[data-erorr]")

const searchBtn = document.querySelector("[data-searchBtn]")

getSessionStorage()

let currentTab = userWeather 
userWeather.classList.add("current-tab")

userWeather.addEventListener('click' , ()=> (switchTab(userWeather)))           
searchWeather.addEventListener('click' , ()=> (switchTab(searchWeather)))

function switchTab(clickedTab){
    if(clickedTab != currentTab){
        currentTab.classList.remove("current-tab")
        currentTab = clickedTab 
        currentTab.classList.add("current-tab")
        
        if(!searchForm.classList.contains("active")){
            weatherDisplay.classList.remove("active")
            searchForm.classList.add("active")
            userLocation.classList.remove("active")
        }
        else{
            searchForm.classList.remove("active")
            weatherDisplay.classList.remove("active")

            getSessionStorage()
        }
    }
}

function getSessionStorage(){
    const localCoordinates = sessionStorage.getItem("user-coordinates")
    
    if(!localCoordinates){
        userLocation.classList.add("active")
    }
    else{
        const coordinates = JSON.parse(localCoordinates)
        getUserWeatherInfo(coordinates)
    }
}

async function getUserWeatherInfo(coordinates){             
    const {lat, lon} = coordinates;
    userLocation.classList.remove("active")
    loading.classList.add("active")

    try{
        let result = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
        let data = await result.json()
        loading.classList.remove("active")  ;                
        renderWeatherInfo(data)
    }
    catch(error){
        loading.classList.remove("active")
        console.log("Your location is not working")
    }
}

function renderWeatherInfo(data){                          
    const cityName = document.querySelector("[data-cityName]")
    const countyFlag = document.querySelector("[data-countyFlag]")
    const weatherDescription = document.querySelector("[data-weatherDescription]")
    const weatherIcon = document.querySelector("[data-weatherIcon]")
    const temp = document.querySelector("[data-cityTemp]")
    const windspeed = document.querySelector("[data-windspeed]")
    const humidity = document.querySelector("[data-humidity]")
    const cloud = document.querySelector("[data-cloud]")

    cityName.textContent = data?.name
    countyFlag.src = `https://flagcdn.com/144x108/${data?.sys?.country?.toLowerCase()}.png`
    weatherDescription.textContent = data?.weather?.[0]?.description
    weatherIcon.src = `http://openweathermap.org/img/w/${data?.weather?.[0]?.icon}.png`

    temp.textContent = `${data?.main?.temp}°C` 

    windspeed.textContent = `${data?.wind?.speed}m/s`
    humidity.textContent = `${data?.main?.humidity}%`
    cloud.textContent = `${data?.clouds?.all}%`  
    
    weatherDisplay.classList.add("active")
}

accessBtn.addEventListener('click' , ()=> {
    getLocation()
} )

function getLocation(){                         
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(getCurentCordinates)
    }
    else{
        console.log("Cordinates not available")
    }                                          
}

function getCurentCordinates(position){       
    let currentCordinates = {
        lat : position.coords.latitude,
        lon : position.coords.longitude
    }

    sessionStorage.setItem("user-coordinates" , JSON.stringify(currentCordinates))

    getUserWeatherInfo(currentCordinates)
}

const apiErrorContainer = document.querySelector(".api-error-container")
const apiErrorImg = document.querySelector("[data-notFoundImg]");
const apiErrorMessage = document.querySelector("[data-apiErrorText]");
const apiErrorBtn = document.querySelector("[data-apiErrorBtn]");

async function getCityWeatherInfo(city){
    loading.classList.add("active");
    weatherDisplay.classList.remove("active");
    apiErrorContainer.classList.remove("active");
  
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();
      if (!data.sys) {
        throw data;
      }
      loading.classList.remove("active");
      weatherDisplay.classList.add("active");
      renderWeatherInfo(data);
    } catch (error) {
      loading.classList.remove("active");
      apiErrorContainer.classList.add("active");
      apiErrorMessage.innerText = `${error?.message}`;
      apiErrorBtn.style.display = "none";
    }
  }

searchForm.addEventListener("submit", (e) =>{
    e.preventDefault();
    let city = searchCity.value;
    if(city === "") 
        return;
    else
        getCityWeatherInfo(city);

})
