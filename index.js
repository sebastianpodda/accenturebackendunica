const express = require('express');
const cors = require('cors');
const app = express();

const rp = require('request-promise');
const appid = '800b007c2370cc79b4c835aae5bdfcaa';
const port = 8000;

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.get('/', cors(corsOptions), (req, res) => res.send('Accenture Bootcamp backend API by Sebastian!'));

const city = 'Cagliari'; // default location
app.get('/weather', cors(corsOptions), (req, res) => {
    rp('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + appid, {json: true}).then(body => {
        res.send(processData(body));
    }).catch(err => {
        res.send(err);
    });
});

// custom location
app.get('/weather/:location', cors(corsOptions), (req, res) => {
    rp('https://api.openweathermap.org/data/2.5/weather?q=' + req.params.location + '&appid=' + appid,
        {json: true}).then(body => {
        //console.log(processData(body));
        res.send(extendData(body));
    }).catch(err => {
        res.send(err);
    });
});

function processData(body) {
    let result = {
        "location": body.name,
        "temp": parseFloat((body.main.temp - 273.15).toFixed(1)),
        "humidity": body.main.humidity,
        "wind": body.wind.speed,
        "pressure": body.main.pressure,
    };
    return result;
}

function extendData(body){
    const iconURL = "http://openweathermap.org/img/wn/";
    let result = {
        "location": body.name,
        "temp": parseFloat((body.main.temp - 273.15).toFixed(1)),
        "humidity": body.main.humidity,
        "wind": body.wind.speed,
        "pressure": body.main.pressure,
        "description": body.weather[0].description,
        "icon": iconURL + body.weather[0].icon + ".png"
    };
    return result;
}

module.exports = app.listen(port, () => console.log(`Listening on port ${port}...`));
