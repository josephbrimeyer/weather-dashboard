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

//  this function calls out to 2 api's to get all of the data for the main card.
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

        $("#temperature").text(tempF + "°F");
        $("#humidity").text(humidity + "%");
        $("#windspeed").text(windSpeed + " MPH");
        $("#city").text(cityName + ",  ");
        let date = new Date().toLocaleString();
        $("#date").text(date + " ");
        $("#img").attr("src", iconUrl);

        let queryLat = lat;
        let queryLon = lon;
        // API call to get the UV values.
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

        })
        //  This API call returns the data for the 5-Day forecast and populates the cards.
        let fiveDayUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${queryLat}&lon=${queryLon}&exclude=current,minutely,hourly&appid=${apiKey}`;
        $.ajax({
            url: fiveDayUrl,
            method: "GET"
        }).then(function (response3) {
            $(".five-day").each(function (index) {
                let Resdata = response3.daily[index + 1];
                let dateElem = Resdata.dt;
                let day = moment.unix(dateElem).format('l');
                let icon = Resdata.weather[0].icon;
                let iconUrl = `http://openweathermap.org/img/wn/${icon}.png`;
                let temp = ((Resdata.temp.day - 273.15) * 1.80 + 32).toFixed();
                let humidity = Resdata.humidity;

                $(this).find(".date").text(day);
                $(this).find(".weather-icon").attr("src", iconUrl);
                $(this).find(".temperature").text(temp + "°F");
                $(this).find(".humidity").text(humidity + "%");
            })

        });
    });
}






