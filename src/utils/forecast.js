const request = require('request')

const forecast = (latitude,longitude,callback) =>{
    const url = 'https://api.darksky.net/forecast/d5c787cdfe2a1e86b6023821173620d5/'+latitude+','+longitude+'?units=si'
    request({url,json: true},(error,{body})=>{
        if(error){
            callback('Unable to connect to location services',undefined)
        }else if (body.error){
            callback('Unable to find location',undefined)
        }else{
            callback(undefined,body.daily.data[0].summary+'It is currently '+body.currently.temperature+' There is a '+body.currently.precipProbability+'% chance of rain')
        }

    })

}


module.exports = forecast