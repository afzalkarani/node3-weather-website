const request = require('request')

// const url='http://api.weatherstack.com/current?access_key=479cbd4e4b1db4751f9c18ed9203576b&query=Dubai'


//  request({url:url, json:true},(error, response)=>{

//     if(error)
//     {
//      console.log('Unable to connect to weather service')
//     } else if(response.body.error){
// console.log('Unable to find location')
//     }


//     else
//     {
//         console.log("Current Temparature for " +
//         response.body.location.name + " is "  + response.body.current.temperature)
//     }
 
//  })


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

            callback(undefined, {
                Temperature: body.current.temperature                
            })
        }

    })
}


module.exports = forecast