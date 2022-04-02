const monogoose = require('mongoose')
const Schema = require('../models/article')

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

module.exports = [createarticle]