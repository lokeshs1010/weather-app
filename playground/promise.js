// let asyncAdd = (a,b) => {
//     return new Promise ((resolve, reject) => {
//         setTimeout(() => {
//             if(typeof a === 'number' && typeof b === 'number') {
//                 resolve(a+b);
//             } else {
//                 reject('Values must be number')
//             }
//         }, 2000)
//     })
// }

// asyncAdd(5,7).then((res) => {
//     console.log(res);
// }, (err) => {
//     console.log(err)
// })

const request = require('request');

let geocode = (address) => {
    return new Promise((resolve, reject) => {
        request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}`,
            json:true
        }, (error, response, body) => {
            if (error) {
                reject('Could not connect to the server')
            } else if (body.status === 'ZERO_RESULTS') {
                reject('Could not find the address')
            } else if(body.status === 'OVER_QUERY_LIMIT') {
                reject('error_message" : You have exceeded your daily request quota for this API. We recommend registering for a key at the Google Developers Console: https://console.developers.google.com/apis/credentials?project=_')
            } else if (body.status === 'OK'){
                resolve(JSON.stringify(body, undefined, 2))
            }
        })
    })
}

geocode('19146').then((location) => {
    console.log(location)
}, (err) => {
    console.log(err)
})