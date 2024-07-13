/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/

const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const env = require("dotenv").config()
const app = express()
const utilities = require("./utilities")
const session = require("express-session")
const pool = require('./database/')
const path = require ('path')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser")

const static = require("./routes/static")
const baseController = require("./controllers/baseController")
const inventoryRoute = require("./routes/inventoryRoute")
const accountRoute = require('./routes/accountRoute')
const accountController = require ('./controllers/accountController')

/* ***********************
 * Middleware
 * ***********************/

// Specify the path to your favicon.ico file
app.use(favicon(path.join('public', 'images', 'site', 'favicon-32x32.png')));

//Session Connection
app.use(session({
  store: new (require('connect-pg-simple')(session))({
    createTableIfMissing: true,
    pool,
  }),
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  name: 'sessionId',
}))



// Express Messages Middleware
app.use(require('connect-flash')())
app.use(function(req, res, next){
  res.locals.messages = require('express-messages')(req, res)
  next()
})

// body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })) //for parsing application

// cookie-parser
app.use(cookieParser())

/* ***********************
 * View Engine and Templates
 *************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout","./layouts/layout") // not at views root

/* ***********************
 * Routes
 *************************/
app.use(static)

// Index route
app.get("/", utilities.handleErrors(baseController.buildHome))

// Inventory routes
app.use("/inv", inventoryRoute)

// Account routes
app.use("/account", require("./routes/accountRoute"))

// Route to build login view
app.get("/login", utilities.handleErrors(accountController.buildLogin))


// Error Route
app.use("/error-msg", utilities.handleErrors(baseController.handleError));

app.use(async (req, res, next) => {
  next({status: 404, message: 'Sorry, it seems like we lost this page :('})
})

//jwtoken
app.use(utilities.checkJWTToken)

/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT
const host = process.env.HOST

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})

/* ***********************
* Express Error Handler
* Place after all other middleware
*************************/

app.use(async (err, req, res, next) => {
  let nav = await utilities.getNav()
  console.error(`Error at: "${req.originalUrl}": ${err.message}`)
  if(err.status == 404){ message = err.message} else {message = 'Oh no! There was a crash. Maybe try a different route?'}
  res.render("errors/error", {
    title: err.status || 'Server Error',
    message,
    nav
  })
})
