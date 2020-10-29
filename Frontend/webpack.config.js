const path = require("path")

module.exports = {
    mode : "production",
    entry : ['@babel/polyfill','./Views/index.js'],
    module:{
        rules : [
            {
                test : /\.(js|jsx)$/,
                exclude: /node_module/, 
                use : 'babel-loader'
            }
        ]
    },
    
    output : {
        filename : 'main.js',
        path : path.join(__dirname , 'dist')
    },


}