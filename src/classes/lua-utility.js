'use strict'
 class lua_Utility  {
    print(text){
        return console.log(text)
    }
    
    sleep(secs){
        let now = Date.now()
        let Future = 0
        do {
            Future = Date.now()
        } while (Future - now < secs*1000)
    }
}



// async function test() {
//     for (let index = 1; index <= 5; index++) {
//         await util.sleep(1)
//         util.print(`Waiting ${index}\'s`)
//      }
// }
// util.sleep(5)
// util.print('Hello the Test Is Begining')
// test()

module.exports = lua_Utility