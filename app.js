require('dotenv').config()

const express = require('express')
const app = express()
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')

const PORT = process.env.PORT || 5000
const expressLayout = require('express-ejs-layouts')
const connectDB = require('./server/config/db')
const { isActiveRoute } = require('./server/helpers/routeHelpers')

//connect db
connectDB()

// parsing data
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(cookieParser())
app.use(methodOverride('_method'))


app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: 'mongodb+srv://jobilite2021:babatunde@cluster0.06ezsxy.mongodb.net/BLOG',
    }),
    //cookie: { maxAge: new Date ( Date.now() + (3600000) ) }
  })
)

//static file
app.use(express.static('public'))

//Template engine setup
app.use(expressLayout)
app.set('layout', './layouts/main')
app.set('view engine', 'ejs')

app.locals.isActiveRoute = isActiveRoute

//routes setup
app.use('/', require('./server/routes/main'))
app.use('/', require('./server/routes/admin'))

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
