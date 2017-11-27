const HtmlWebpackPlugin=require('html-webpack-plugin');
const webpack=require('webpack');
const path=require('path');
const join=(...pathName)=>path.resolve(__dirname,...pathName);

module.exports={
    entry:{
        app:'./src/index.ts',
        polyfill:'./src/polyfill.ts'
    },
    output:{
        filename:'[name].bundle.js',
        path:join('dist')

    },
    module:{
        rules:[
            {
                test:/.ts$/,
                use:'ts-loader',
                exclude:join('node_modules')
            },
            {
                test:/\.css$/,
                use:[
                    {loader:'style-loader'},
                    {loader:'css-loader'}
                ]
            }
        ]
    },
    resolve:{
        extensions:['.ts','.js']
    },
    devtool:'inline-source-map',
    devServer:{
        contentBase:'./dist',
        port:3000
    },
    plugins:[
        new HtmlWebpackPlugin({
            title:'test item',
            template:'1.html'
        })
    ]
}