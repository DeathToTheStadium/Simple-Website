const res = require('express/lib/response')
const monogoose = require('mongoose')
const Schema = require('../models/article')



let createArticle = async function(req,res){
    res.render('./partials/form.ejs',{
        header:{
            title:' FORM | Simple-Website'
        }
    })
}
let saveArticle = async function(){
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
        res.redirect(`/article/${article.slug}`)
    } catch (error) {
        console.log('oops Something went wrong')
        res.status(500).render('500.ejs')
    }
    
}
let findArticle = async function() {}
let updateArticle = async function() {}

let deleteArticle = async function() {}

module.exports = [createArticle,saveArticle,findArticle,updateArticle,deleteArticle]