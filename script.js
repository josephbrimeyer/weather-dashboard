//  declared global variables...
let apiKey = "f61c25ccc3ebc66abfbc574449b8e000";
let cityName;
let searchCity = "";
let cityWeather = {};

// set the event listener...
$("#search-button").on("click", function (event) {
    event.preventDefault();
    searchCity = $("#search-city").val().trim();

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
            } else if (i < 6) {
                $("#uv").addClass("yellow");
            } else if (i < 8) {
                $("#uv").addClass("orange");
            } else if (i < 11) {
                $("#uv").addClass("red");
            } else {
                $("#uv").addClass("purple");
            }

            // getWeatherFiveDay();
            //            https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={YOUR API KEY}
        })
        let fiveDayUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${queryLat}&lon=${queryLon}&exclude=current,minutely,hourly&appid=${apiKey}`;
        $.ajax({
            url: fiveDayUrl,
            method: "GET"
        }).then(function (response3) {
            $(".five-day").each(function (index) {
                let Resdata = response3.daily[index+1];
                console.log(Resdata);
        //         let date = new Date().toLocaleString();
        // $("#date").text(date + " ");
                let dateElem = Resdata.dt;
                let day = moment.unix(dateElem).format('l');
                // let currentDay = moment().format('MMMM Do YYYY');
                let icon = Resdata.weather[0].icon;
                let iconUrl = `http://openweathermap.org/img/wn/${icon}.png`;
                let temp = ((Resdata.temp.day - 273.15) * 1.80 + 32).toFixed();
                let humidity = Resdata.humidity;

                $(this).find(".date").text(day);
                $(this).find(".weather-icon").attr("src", iconUrl);
                $(this).find(".temperature").text(temp);
                $(this).find(".humidity").text(humidity);

                

            })
            
        });
    });
}


// this function calls another api and populates the 5 day forcast. 



 // let buildCardDiv;
        // // [ of objects ]
        // 
        // console.log(Resdata);
        // Resdata.push(cityData);
    // let data = Resdata;
    // function buildCardDiv(data) {
    //     for (let i = 0; i < data.length; i++) {
    //         const element = data[i];
    //         //    element.tempF;
    //         buildCard(element);
    //     }
    // }
    // buildCardDiv();
// }
// function buildCard(data) {
//     let textTest = "Some quick example text to build on the card title and make up the bulk of the card's content."
//     let cardEle = $("<div class='card' style='width: 18rem;'>");
//     let h1Ele = $("<h5 class='card-title'>" + data.name + "endTag");
//     let pEle = $(`<p class="card-text">${textTest}/p>`)
//     //  append to the card div 5 day forecast
// }
// let fullCard = $(`<div class="card" style="width: 18rem;">
//   <div class="card-body">
//     <h5 class="card-title">${}</h5>
//     <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
//     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//     <a href="#" class="card-link">Card link</a>
//     <a href="#" class="card-link">Another link</a>
//   </div>
// </div>`)





