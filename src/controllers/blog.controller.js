const res = require('express/lib/response')
const monogoose = require('mongoose')
const { create } = require('../models/article')
const Schema = require('../models/article')


/* rember to create some dynamic ajax calls that checks if a title is unique or not to avoid errors on 
    slug creation
*/ 
let createarticle = async function(req,res){
    console.log(req.body)
    try {
        let article = new Schema({
            title:req.body.title,
            description:req.body.description,
            author:req.body.author,
            createdAt: new Date(),
            pictureUrl:'',
            body:req.body.body
        })
        await article.save()
    } catch (error) {
        console.log('oops Something went wrong')
    }
    res.redirect('/')
}
let articleform = async function(req,res){
    res.render('form.ejs',{
        header:{
            title:' FORM | Simple-Website'
        }
    })
}

let renderblog = async function(req,res) {
    let articles = await Schema.find()
    res.render('blog.ejs',{
        header:{
            title:'BLOG | Simple-Website'
        },
        blog:{
            content:articles
        }
    })
}

let renderarticle = async function(req,res) {
    let article = await Schema.findOne().where({slug:req.params.id})
    res.render('article.ejs',{
        header:{
            title:'BLOG | Simple-Website'
        },
        blog:{
            content: article
        }
    })
}


module.exports = [renderblog,renderarticle,articleform,createarticle]