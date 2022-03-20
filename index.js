`use strict`
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/testdb')

const lua_utility = require('./src/classes/lua-utility.js')
const routers = {
    index:require('./src/routes/index.router'),
    about:require('./src/routes/about.router'),
    picture:require('./src/routes/picture.router')
}
const express = require('express')
const app = express()
const path = require('path')


const util = new lua_utility()

const Variables = {
    port:3000,
    message:'Listening on port :'
}

app.set('views', './src/views')
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname,'./src/public')))

app.use(routers.index)
app.use(routers.about)
app.use(routers.picture)



app.get('/',function(req,res){
    res.redirect('/home')
})

app.listen(Variables.port,()=>{
    console.log(`${Variables.message}${Variables.port}`)
})

