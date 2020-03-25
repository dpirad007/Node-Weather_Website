const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//set up handelbars engine and view location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)


//set up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Dion Pinto'
    })//no need for file extension index.hbs
})


app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Dion Pinto',
    })
})


app.get('/help',(req,res) => {
    res.render('help',{
        title:'Help Page',
        helptext:'this is some helpful text',
        name:'Dion Pinto'
    })
})

app.get('/weather',(req,res) => {

    if(!req.query.address){
        return res.send({
            error: 'Provide an address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location} = {}) =>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecast) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecast,
                location: location,
                address: req.query.address
            }) 
        })
    })

})

app.get('/products',(req,res) => {
    if (!req.query.search) {
         return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products : []
    })
})


app.get('/help/*',(req,res) => {
    res.render('404',{
        error: 'Help article not found',
        title: '404',
        name: 'Dion pinto'
    })
})

app.get('*',(req,res) =>{
    res.render('404',{
        error :'Page not found',
        title:'404',
        name: 'Dion pinto'
    })
    
})

//to initialise server
app.listen(port,()=>{
    console.log('Server is up on port '+port)
})

