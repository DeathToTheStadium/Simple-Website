let renderblog = function(req,res) {
    res.render('blog.ejs',{
        header:{
            title:'BLOG | Simple-Website'
        }
    })
}


module.exports = [renderblog]