//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
export const apiKey = "32c392564b0ea6d6a08cacec290909f8";

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {

    res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req, res) {
    
    const query = req.body.cityName;
    const unit = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;    

    https.get(url, function(response){
        console.log(response);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

            res.write("<h1>Temperature</h1> <br> <h3>The temperature in "+ query + " is " + temp + " degrees Celcius.</h3>");
            res.write("<h2>Description<h2> <br> <h3>Weather Forecast is </h3>"+ weatherDescription);
            res.write("<img src="+ imageURL +">");
            res.send();
        });
    });
});



app.listen(3000);