const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname +"/index.html");
});

app.post("/", function(req, res){
    const query = req.body.cityName;
    const apiKey = "1f4ed51fc85d6c65cacd2a9eef2931dd";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey +"&units="+ unit;
    
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const weatherIcon = weatherData.weather[0].icon;
            const imageURL = "https://openweathermap.org/img/wn/"+ weatherIcon +"@2x.png";
            res.write("<h1>The temperature in "+ query +" is " + temp +" degree Celcius.</h1>");
            res.write("<h5>The weather is currently "+ weatherDescription +".</h5>");
            res.write("<img src=" + imageURL +" />");
            res.send();
        });
    });
    
});




app.listen(3000, function(){
    console.log("Server is running");
});