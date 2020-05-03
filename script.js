//  declared global variables...
let apiKey = "f61c25ccc3ebc66abfbc574449b8e000";
let cityName;
let searchCity = "";
let cityWeather = {};

// set the event listener...
$("#search-button").on("click", function (event) {
    event.preventDefault();
    searchCity = $("#search-city").val().trim();
    console.log(searchCity);
    getWeatherByCity()
});

//  this function calls out to 2 api's to get all data for the main card.
function getWeatherByCity() {
    let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apiKey}`;
    $.ajax({
        url: weatherUrl,
        method: "GET"
    }).then(function (response) {
        let lat = response.coord.lat;
        let lon = response.coord.lon;
        let cityName = searchCity + "";
        let tempF = ((response.main.temp - 273.15) * 1.80 + 32).toFixed();
        let humidity = response.main.humidity;
        let windSpeed = response.wind.speed; 
        let icon = response.weather[0].icon;
        let iconUrl = `http://openweathermap.org/img/wn/${icon}.png`;
        $("#temperature").text(tempF + " °F");
        $("#humidity").text(humidity + " %");
        $("#windspeed").text(windSpeed + " MPH");
        $("#city").text(cityName + ",  ");
        let date = new Date().toLocaleString();
        $("#date").text(date + " ");
        $("#img").attr("src", iconUrl);
        console.log(response);
        let queryLat = lat;
        let queryLon = lon;
        let uvIndexUrl = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${queryLat}&lon=${queryLon}`;
        $.ajax({
            url: uvIndexUrl,
            method: "GET"
        }).then(function (response2) {
            let uvValue = response2.value;
            $("#uv").text(uvValue);
            let i = uvValue;
            
            if (i < 3) {
                $("#uv").addClass("green");
            } if (i < 6) {
                $("#uv").addClass("yellow"); 
            } if (i < 8) {
                $("#uv").addClass("orange");
            } if (i < 11) {
                $("#uv").addClass("red"); 
            } if (i >= 11) {
                 $("#uv").addClass("purple");
            }
            console.log(i);

            console.log(response);
            getWeatherFiveDay();
        })
    })
}
// this function calls another api and populates the 5 day forcast. 
function getWeatherFiveDay() {
    let fiveDayUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&appid=${apiKey}`;
    $.ajax({
        url: fiveDayUrl,
        method: "GET"
    }).then(function (response) {

        console.log(response);
        searchCity = "";

    })
}

// ..................................................................................................
// $.ajax({
//     url: "w/e api you are requesting",
//     method: "GET"
//    }).then(function(Resdata){
//     // [ of objects ]
//        // let Resdata = [{} sent from api]
//     console.log(Resdata);
//     buildCardDiv(Resdata)
//    })
//    function buildCard(data) {
//        let cardEle = $("<div class='card'");
//        // PSEUDO CODE: let h1Ele = $("tag" + data.name + "endTag");
//        // append to the card div 5 day forecast
//    }
//    // let data = Resdata;
//    function buildCardDiv(data) {
//        for (let i = 0; i < data.length; i++) {
//            const element = data[i];
//         //    element.tempF;
//            buildCard(element);
//        }  
//    }
// //    buildCardDiv();





