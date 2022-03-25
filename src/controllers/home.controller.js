
let renderhome = function(req,res) {
    res.render('index.ejs',{
        header:{
            title:'HOMEPAGE | Simple-Website'
        }
    })
}


module.exports = [renderhome]