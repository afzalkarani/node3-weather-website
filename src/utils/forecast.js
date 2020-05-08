const request = require('request')


const forecast = (latitude,longitude, callback) => {

    const url='http://api.weatherstack.com/current?access_key=479cbd4e4b1db4751f9c18ed9203576b&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '&units=m'

    request({url, json:true}, (error, {body})=>{

        if(error)
        {
            callback('Unable to connect to forecast services', undefined)
        }
        else if (body.error)
        {
            callback('Unable to find location. Try another search', undefined)
        }
        else
        {
            callback(undefined, body.current.weather_descriptions[0] + ". The current temparature is " + body.current.temperature + "degrees out. It feels like " + body.current.feelslike + ". Wind speed is " + body.current.wind_speed + " with humidity "  + body.current.humidity + "%. Changes for rain is " + body.current.cloudcover + " %" )
        }

    })
}


module.exports = forecast