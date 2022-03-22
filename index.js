`use strict`

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/testdb');

const lua_utility = require('./src/classes/lua-utility.js');

const express = require('express')
const expressLayouts = require('express-ejs-layouts');
const path = require('path')
const app = express()



const util = new lua_utility()

const Variables = {
    port:3000,
    message:'Listening on port :'
}

app.set('views', './src/views')
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname,'./src/public')))
app.use(expressLayouts)


app.get('/',function(req,res){
    res.render('index',{
        header:{
            title:'Whoa its kinda'
        }
    })
})

app.listen(Variables.port,()=>{
    console.log(`${Variables.message}${Variables.port}`)
})

