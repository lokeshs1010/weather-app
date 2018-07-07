const request = require('request');

let getWeather = (latitude, longitude, callback) => {
    request({
        url: `https://api.darksky.net/forecast/a65ab11b7534f19eea3785deea2de9b8/${latitude},${longitude}`,
        json:true
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            callback(undefined, {
                Temperature: body.currently.temperature,
                ApparentTemperature: body.currently.apparentTemperature
            })
        } else {
            callback('Unable to fetch weather');
        }
    })
}

module.exports = {
    getWeather
}
