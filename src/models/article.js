'use strict'

const mongoose = require('mongoose')
const slugify = require('slugify')
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

Schema.pre('validate',function(next){
    if(this.title) {
        this.slug = slugify(this.title)
    }
    next()
})

module.exports = mongoose.model('articles',Schema)