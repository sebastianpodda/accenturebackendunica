const express = require('express');
const cors = require('cors');
const app = express();

const rp = require('request-promise');
const appid = 'puthereyours';
const port = 8000;

app.listen(port, () => {
    console.log('Listening on port ' + port);
});

app.get('/', (req, res) => res.send('Accenture Bootcamp backend API!'));

const city = 'Cagliari'; // default location
app.get('/weather', (req, res) => {
    rp('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + appid, {json: true}).then(body => {
        res.send(processData(body));
    }).catch(err => {
        res.send(err);
    });
});

// custom location
app.get('/weather/:location', (req, res) => {
    rp('https://api.openweathermap.org/data/2.5/weather?q=' + req.params.location + '&appid=' + appid,
        {json: true}).then(body => {
        //console.log(processData(body));
        res.send(extendData(body));
    }).catch(err => {
        res.send(err);
    });
});

/*METODI DI SUPPORTO*/
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
