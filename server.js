if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const flash = require('express-flash')
const session = require('express-session')
const app = express()
const bcrypt = require('bcryptjs')
const passport = require('passport')
const methodOverride = require('method-override')
const initializePassport = require('./passportConfig')
const PORT = process.env.PORT || 3000

initializePassport(
    passport, 
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)

const users = []

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

app.get('/', checkAuthenticated, (req,res) => {
    res.render('index.ejs', {name: req.user.name})
})

app.get('/login', notAuthenticated, (req,res) => {
    res.render('login.ejs')
})

app.get('/register', notAuthenticated, (req,res) => {
    
    res.render('register.ejs')
})

app.post('/register', notAuthenticated, async (req,res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id:Date.now().toString(),
            name:req.body.name,
            email:req.body.email,
            password:hashedPassword
        })
        res.redirect('/login')
    } catch {
        res.redirect('/register')
    }
    console.log(users)
})

app.post('/login', notAuthenticated, passport.authenticate('local', {
    successRedirect:'/',
    failureRedirect:'/login',
    failureFlash:true
}))

app.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login')
})

function checkAuthenticated(req, res, next){
    if ( req.isAuthenticated()){
        return next()
    }
    res.redirect('/login')
}

function notAuthenticated(req, res, next){
    if ( req.isAuthenticated()){
        return res.redirect('/')
    }
    next()
}

app.listen(PORT, function() {
    console.log(`Now listening on PORT ${PORT}!`);
  });

