const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
    .options({
        a : {
            describe: 'Address to fetch weather',
            demand:true,
            alias: 'address',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

let encodedAddress = encodeURIComponent(argv.address);
let geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl).then((response) => {
    if(response.data.status === 'ZERO_RESULTS') {
        throw new Error('Could not find the address')
    }
    if(response.data.status === 'OVER_QUERY_LIMIT') {
        throw new Error('error_message : You have exceeded your daily request quota for this API. We recommend registering for a key at the Google Developers Console: https://console.developers.google.com/apis/credentials?project=_')
    }
    let latitude = response.data.results[0].geometry.location.lat;
    let longitude = response.data.results[0].geometry.location.lng;
    let weatherUrl = `https://api.darksky.net/forecast/a65ab11b7534f19eea3785deea2de9b8/${latitude},${longitude}`;
    console.log(`Address: ${response.data.results[0].formatted_address}`);
    return axios.get(weatherUrl);
}).then((response) => {
    let temperature = response.data.currently.temperature;
    let apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`Temperature is ${temperature}. But It feels like ${apparentTemperature}`);
}).catch((error) => {
    if(error.code === 'ENOTFOUND') {
        console.log('Unable to connect to server');
    }
    else {
        console.log(error.message);
    }
})
