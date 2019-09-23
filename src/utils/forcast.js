request = require ('request')

const forcast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/990fb6c83328fc0365c2d4dc2e1e5102/'+ latitude + ',' + longitude + '?units=si'
    request ({url ,json:true}, (error, { body }) => {
        if (error) {
            callback ('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback ('Unable to find location.', undefined)
        } else {
            callback (undefined, body.daily.data[0].summary + ' current temperature is : ' + body.currently.temperature + ' degrees in ' + body.timezone + ' and there are '+ body.currently.precipProbability + '% chance of rain')

        }
    })
}

module.exports = forcast