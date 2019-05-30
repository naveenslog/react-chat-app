const path = require('path');
 const HWP = require('html-webpack-plugin');
 module.exports = {
    entry: path.join(__dirname, '/src/index.js'),
    output: {
        filename: 'widget.js',
        path: path.join(__dirname, '/dist')},
    module:{
        rules:[{
           test: /\.js$/,
           exclude: /node_modules/,
           loader: 'babel-loader'
        },
          {
            test: /\.(jpe?g|png|gif|svg)$/i,
            loader: 'file-loader',
            
          },
          {
            test: /\.(s*)css$/,
            use: [
              'style-loader',
              'css-loader',
              'sass-loader'
            ]
          }
        ]
    },
    plugins:[
        new HWP(
           {template: path.join(__dirname,'/src/index.html')}
        )
    ]
 
}