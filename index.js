`use strict`

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/testdb');

const lua_utility = require('./src/classes/lua-utility.js');

const express = require('express')
const expressLayouts = require('express-ejs-layouts');
const path = require('path')
const app = express()
const routes = require('./src/loaders/express.loader');




const variables = {
    port:3000,
    message:'Listening on port :'
}

app.set('views', './src/views')
app.set('view engine', 'ejs')

app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'./src/public')))
app.use(expressLayouts)

routes.then(function(routes){
    console.log(routes,'im in the index file')
    for (const key in routes) {
        if (Object.hasOwnProperty.call(routes, key)) {
            const router = routes[key];
            console.log(key)
            app.use(`/${key}`,router)
        }
    }
    // Load in our 404 page after every router has loaded
    app.use('*',function(req,res,next){
        res.status(404).render('404.ejs',{
            header:{title:'404 Error Page | Simple Website'}
        })
        next()
    })
})

app.get('/',function(req,res){
    res.redirect('/home')
})



// app.get('/home',function(req,res){
//     res.render('index',{
//         header:{
//             title:'HOMEPAGE | Simple-Website'
//         }
//     })
// })


// app.get('/about',function(req,res){
//     res.render('about',{
//         header:{
//             title:'ABOUT | Simple-Website'
//         }
//     })
// })

// app.get('/blog',function(req,res){
//     res.render('blog',{
//         header:{
//             title:'BLOG | Simple-Website'
//         }
//     })
// })

app.listen(variables.port,()=>{
    console.log(`${variables.message}${variables.port}`)
})

