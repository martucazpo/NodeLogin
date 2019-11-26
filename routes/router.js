const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const passport = require('passport')
const initializePassport = require('../public/assets/javascript/passportConfig')
const users = []

initializePassport(
    passport, 
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)

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

router.get('/', checkAuthenticated, (req,res) => {
    res.render('index.ejs', {name: req.user.name})
})

router.get('/login', notAuthenticated, (req,res) => {
    res.render('login.ejs')
})

router.get('/register', notAuthenticated, (req,res) => {
    
    res.render('register.ejs')
})

router.post('/register', notAuthenticated, async (req,res) => {
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

router.post('/login', notAuthenticated, passport.authenticate('local', {
    successRedirect:'/',
    failureRedirect:'/login',
    failureFlash:true
}))

router.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login')
})

module.exports = router

