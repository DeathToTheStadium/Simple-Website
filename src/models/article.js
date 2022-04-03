'use strict'
const { marked } = require('marked');
const mongoose = require('mongoose')
const slugify = require('slugify')

const createDomPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const dompurify = createDomPurify(new JSDOM().window)
const Schema = mongoose.Schema(
    {
        title:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        author:{
            type:String,
            required:true
        },
        createdAt: {
            type:Date,
            required:true
        },
        pictureUrl:{
            type:String,
        },
        slug:{
            type:String,
            required:true,
            unique:true
        },
        body:{
            type:String,
            required:true
        }
    }
)
console.log()
Schema.pre('validate',function(next){
    if(this.title) {
        this.slug = slugify(this.title)
    }
    this.body = dompurify.sanitize(marked(this.body))
    next()
})

module.exports = mongoose.model('articles',Schema)