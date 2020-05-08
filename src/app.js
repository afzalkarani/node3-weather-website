const path = require('path')
const express  =require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast  = require('./utils/forecast')

const app = express()
const port=process.env.PORT || 3000


//define path for express config
const publicDirectoryPath =path.join(__dirname, '../public') 
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) =>{
    res.render('index',{
        title:'Weather App',
        name :"Afzal"
    })
})


app.get('/about', (req, res) =>{
    res.render('about',{
        title:'About me',
        name :"Afzal"
    })
})

app.get('/help', (req, res) =>{
    res.render('help',{
        helpText:'About me',
        name :"Afzal",
        title:"Help"
    })
})
app.get('/help/*', (req, res) => {
    res.render('404',{
        title:'404',
        name:'afzal',
        errorMessage:'Help Article not found'
    })
})


app.get('/weather', (req, res)=>{

    if(!req.query.address)
    {
        return res.send({error: "you must provide address"})
    }

    geocode(req.query.address, (error, {latitude, longitude,location}={}) =>{
        if(error){
          return  res.send({
              error
          })
        }   
    forecast(latitude, longitude ,(error,foreCastData) => {
        if(error)
        {
           return res.send({
               error
           })
        }
        res.send({
            forecast: foreCastData,
            location,
            address:req.query.address
        })
        
        })    
    })
    

    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'Sharjah',
    //     addreess: req.query.address
    // })
})


app.get('/products', (req, res) =>{

    if(!req.query.search)
    {
      return res.send({error: "you must provide search term"})
    }

    console.log(req.query.search)
    res.send({product:[]})

})

app.get('*', (req, res)=>{

res.render('404',{
    title:'404',
    name:'afzal',
    errorMessage:'Page not found'
})


})

app.listen(port, () =>{

    console.log('Server is up on port ' + port)
})