'use strict'
const fs = require('fs');
const path = require('path');




class dir_use{
    /**
 *Takes An Absolute path From Current Working Directory
 * @param {string} absolutepath - Works By Using Native Paths With __dir -Example: path.resolve(__dirname,'../../src'))
 * @yields {object} - Absolute path to directory & Current Paths
 *  */
    async readDir(absolutepath){
        let directory;
        try {
            let directory = await fs.promises.readdir(absolutepath,function(error,folders){
                if (error) {throw error}
                return {path:absolutepath,folder:folders}
            });
            return {path:absolutepath,folder:directory}
        } catch (error) {
            console.log(error,'Was error')
        }
    }
}


/*
||Extra Example For Me XD||

let newdir = new dir_use()

newdir.readDir(path.resolve(__dirname,'../../src')).then(result => console.log(result))

*/



module.exports = new dir_use()