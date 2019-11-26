if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const flash = require('express-flash')
const session = require('express-session')
const app = express()
const passport = require('passport')
const methodOverride = require('method-override')
const PORT = process.env.PORT || 3000
const routes = require('./routes/router.js')

app.set('view-engine', 'ejs')

app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({extended:false}))
app.use(flash())
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))
app.use(routes)

app.listen(PORT, function() {
    console.log(`Now listening on PORT ${PORT}!`);
  });

