const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry : {
        app: "./src/assets/js/index.js"
    },
    output: {
        clean: true,
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    mode: "development",
    devServer: {
        static: {
            directory: path.join(__dirname, 'src'),
        },
        //static: "./src",
        compress: true,
        port:8080,
        hot: true
    },
    module: {
        rules:[
            {
                test: /\.(s[ac]ss|css)$/i,
                use: ["style-loader", "css-loader", "sass-loader", ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource"
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "God Of War Ragnarok",
            template: "./src/index.html"
        })
    ]
}
