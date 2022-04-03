const monogoose = require('mongoose')
const Schema = require('../models/article')

let createArticle = async function(req,res){
    res.render('create.ejs',{
        header:{
            title:' CREATE | Simple-Website'
        },
        body:{
            form:{
                action:'/admin/save',
                method:'post',
                button:'Create Article'
            }
        }
    })
}
let saveArticle = async function(req,res){
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
        res.redirect(`/blog/article/${article.slug}`)
    } catch (error) {
        console.log(error)
        console.log('oops Something went wrong')
        res.status(500).render('500.ejs',{
            header:'ERROR | Simple Website'
        })
    }
    
}
let editArticle = async function(req,res) {
    let article = await Schema.findOne().where({slug:req.params.id})
    res.render('update.ejs',{
        header:{
            title:' Update | Simple-Website'
        },
        body:{
            form:{
                header:'Update',
                action:'/admin/update/'+ article._id,
                method:'post',
                title:article.title,
                description:article.description,
                author:article.author,
                body:article.body,
                button:'Update Article'
            }
        }
    })
}
let updateArticle = async function(req,res) {
    let article = Schema
    console.log(req.body,req.params)
    article.findByIdAndUpdate({_id:`${req.params.objectId}`},req.body,function(error,result){
        if(error){
            console.log(error)
            res.status(500).render('500.ejs')
        }else {
            console.log(result)
            res.redirect('/blog/article/'+ result.slug)
        }
    })
}

let deleteArticle = async function(req,res) {
    let article = Schema
    await article.deleteOne().where({_id:req.params.objectId})
    res.render('deleted.ejs',{
        header:{
            title:' FORM | Simple-Website'
        }
    })
}
let admin = async function(req,res) {
    let articles = await Schema.find()
    res.render('admin.ejs',{
        header:{
            title:' FORM | Simple-Website'
        },
        blog:{
            content:articles
        }
    })
}

let login = async function(req,res) {
    res.render('login-form.ejs',{
        header:{
            title:' LOGIN | Simple-Website'
        }
    })
}

module.exports = [admin,createArticle,saveArticle,editArticle,updateArticle,deleteArticle,login]