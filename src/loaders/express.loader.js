const path = require('path')
const dir_use = require('../classes/directory')
const lua_utility = require('../classes/lua-utility')
const u = new lua_utility()

async function Routers(){
     return dir_use.readDir(path.resolve(__dirname,'../routes')).then(function(result){
        // console.log(result)
        let generatedRoutes = {}
        result.folder.forEach(file => {
           generatedRoutes[file.split('.router.js')[0]] = require(`${result.path}\\${file}`)
        });
        return generatedRoutes
    })
}

module.exports = Routers()