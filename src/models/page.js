const mongoose = require('mongoose')
const slugify = require('slugify')
const { marked } = require('marked');
const createDomPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const dompurify = createDomPurify(new JSDOM().window)
const Schema = mongoose.Schema({
    Home:{
        welcome:{
            title:{
                type:String,
            },
            description:{
                type:String,
            }
        },
        sections:{
            boxOne:{
                title:{
                    type:String,
                },
                description:{
                    type:String,
                }
            },
            boxTwo:{
                title:{
                    type:String,
                },
                description:{
                    type:String,
                }
            },
            boxThree:{
                title:{
                    type:String,
                },
                description:{
                    type:String,
                }
            }
        }
    },
    About:{
        mantra:{
            type:String
        },
        title:{
            type:String
        },
        content:{
            type:String
        }
    }
})

Schema.pre('validate',function(next){
    next()
})



module.exports = mongoose.model('pages',Schema)