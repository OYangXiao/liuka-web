const path = require('path')
const webpack = require('webpack')
const srcPath = path.join(__dirname, 'src')

module.exports = {
    entry: {
        main: path.join(srcPath, 'main.tsx') // Your appʼs entry point
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.LoaderOptionsPlugin({
            debug: true
        })
    ],

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        modules: [
            srcPath,
            'node_modules'
        ],
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    performance: { hints: false },

    externals: {
        // "react": "React",
        // "react-dom": "ReactDOM",
        "mobx": "mobx",
        "mobx-react": "mobxReact",
        "rxjs": "Rx",
        "styled-components": "styled",
        'utils/dict': 'dict'
    },
    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
            { test: /\.css$/, loaders: ['style-loader', 'css-loader', 'postcss-loader'] },
            { test: /\.scss$/, loaders: ["style-loader", "css-loader", "sass-loader", 'postcss-loader'] },
            { test: /\.less$/, loaders: ["style-loader", "css-loader", "less-loader", 'postcss-loader'] }
        ]
    },
    output: {
        filename: "[name].js",
        publicPath: 'http://localhost:8080/js/',
        path: path.resolve(__dirname),
        pathinfo: true,
        libraryTarget:"umd"
    },


    devServer: {
        host: '0.0.0.0',
        disableHostCheck: true,
        port: 8080,
        historyApiFallback: true
    }
};