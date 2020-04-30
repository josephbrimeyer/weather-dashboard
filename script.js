let cityName = "Chicago";
let apiKey = "f61c25ccc3ebc66abfbc574449b8e000";
let weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
$.ajax({
    url: weatherURL,
    method: "GET"
}).then(function(response){

console.log(response);

}) 