//  ......id's to declare with jQuery....
//  city, date, icon
//  temperature
//  humidity
//  wind speed
//  uv
//  ................
//  need to get and set the values to a variable for lat and lon from the object of getWeatherByCity and concatinate to the function of getWeatherByLatLon.
//  lon
//  lat
//  set a new variable for lat and lon.
//  ..................


// let searchResult = $("");
let apiKey = "f61c25ccc3ebc66abfbc574449b8e000";
let cityName;
// let searchResult;
let lat = "41.85";
let lon = "-87.65";
let searchCity;
// let searchBtn = $("");
function getWeatherByCity() {
    let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apiKey}`;
    $.ajax({
        url: weatherUrl,
        method: "GET"
    }).then(function (response) {
       

        console.log(response);
        getWeatherByFiveDay();

    })
}
function getWeatherFiveDay() {
    let fiveDayUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`;
    $.ajax({
        url: fiveDayUrl,
        method: "GET"
    }).then(function (response) {

        console.log(response);
        getWeatherByLatLon()

    })
}
function getWeatherByLatLon() {
    let uvIndexUrl = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`;
    $.ajax({
        url: uvIndexUrl,
        method: "GET"
    }).then(function (response) {

        console.log(response);
        

    })
}
$("#search-button").on("click", function (event) {
    event.preventDefault();
    let searchCity = $("#search-city").val().trim();
    // searchResult = ("#search-city");
    console.log(searchCity);
    // searchCity = cityName;
    getWeatherByCity()

    

});

// }

// }
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





