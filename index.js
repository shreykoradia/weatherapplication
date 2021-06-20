 const express = require('express')
 const bodyParser = require('body-parser');
 const request = require('request');
 const app = express()



 require('dotenv').config()
 const port = process.env.PORT || 5000

 
 const apiKey = process.env.API_KEY ;
 
 // !important! 
 // you need to install the following libraries |express|[dotenv > if required]
 // or run this command >> npm i express dotenv 
 
// for rendering the web-application pages and also setting the pages 

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')


app.get('/', function (req, res) {
    res.render('app', {weather: null, error: null});
  })
 

app.post('/' , (req , res)=>{

   let city = req.body.city ;
   let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

   request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('app', {weather: null, error: 'Error, please try again'});
      } else {
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        let weatherTextExpanded = `It's ${weather.main.temp} degrees, with
          ${weather.main.humidity}% humidity in ${weather.name}!`;
        res.render('app', {weather: weatherTextExpanded, error: null});
      }
    }
  });
})

app.listen(port, function () {
  console.log('Example app listening on port 5000!')
})