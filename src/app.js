const express =require ('express')
const path = require ('path')
const hbs = require ('hbs')


const geocode = require ('./utils/geocode')
const forcast = require ('./utils/forcast')


//finding root path
//console.log(global.appRoot = path.resolve(__dirname))

const app = express ()

//joining root path with views and Public to access CSS and hbs files
const viewsDirectoryPath = path.join(__dirname, '../templates/views')
const publicDirectoryPath = path.join(__dirname, '../Public')
const partialsPath = path.join(__dirname, '../templates/partials')

//console.log(partialsPath)
//setting up views path to access hbs from root
app.set('views', viewsDirectoryPath);
//setting up hbs settings for dynamic templates
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)
//accessing Public folder for static stuff
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Osama'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About',
        name: 'Osama'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        name: 'Osama'
    })
})


app.get('', (req, res) => {
    res.send('<h1> Weather<h1>')
})

app.get('/weather', (req, res) => {
    console.log(req.query.add)
    if (!req.query.add) {
        return res.send({
            error: 'You must provide a search!'
        })
    }
    geocode(req.query.add, function(error, {latitude, longitude, location} = {}) {
        if (error) {
            return res.send({error})
        }
    
        forcast (latitude, longitude, (error, forcastData) => {
    
            if (error) {
                return res.send({error})
            }
    
            res.send({
                location,
                forecast: forcastData,
                address: req.query.add
            })
    
         })  
    
    })


})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Osama Zahid',
        errorMessage: 'Help article not found'
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Osama Zahid',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('server is runing on port 3000')
})