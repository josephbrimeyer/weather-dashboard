//  ......id's to declare....
//  city, date
//  temperature
//  humidity
//  wind speed
//  ................
//  lon
//  lat
//  ..................
//  uv
//  
let searchCity = "";
let cityName = "Chicago";
let apiKey = "f61c25ccc3ebc66abfbc574449b8e000";
let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
$.ajax({
    url: weatherUrl,
    method: "GET"
}).then(function (response) {

    console.log(response);

})
let fiveDayUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`;
$.ajax({
    url: weatherUrl,
    method: "GET"
}).then(function (response) {

    console.log(response);

})
let lat = "41.85";
let lon = "-87.65";

let uvIndexUrl = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`;
$.ajax({
    url: uvIndexUrl,
    method: "GET"
}).then(function (response) {

    console.log(response);

})

$("#search-button").on("click", function (event) {
    event.preventDefault();

    let buttonID = $(this).attr("id");
    console.log(buttonID);
});

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





