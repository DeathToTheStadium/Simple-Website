let renderabout = function(req,res) {
    res.render('about.ejs',{
        header:{
            title:'ABOUT | Simple-Website'
        }
    })
}


module.exports = [renderabout]   