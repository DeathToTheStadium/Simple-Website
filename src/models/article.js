'use strict'

const mongoose = require('mongoose')
const slugify = require('slugify')
const { marked } = require('marked');
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
        markdown:{
            type:String,
            required:true
        },
        body:{
            type:String,
            required:true
        }
    }
)

Schema.pre('validate',function(next){
    if(this.title) {
        this.slug = slugify(this.title)
    }
    if (this.markdown) {
        this.body = dompurify.sanitize(marked(this.markdown))
    } else {
        this.body = ''
    }
    next()
})


module.exports = mongoose.model('articles',Schema)