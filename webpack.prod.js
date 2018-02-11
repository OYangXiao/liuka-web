const path = require('path'),
    srcPath = path.join(__dirname, 'src'),
    webpack = require('webpack')

module.exports = {
    target: 'web',
    entry: {
        main: path.join(srcPath, 'main.tsx') // Your appʼs entry point
    },
    plugins: [
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify("production")
            }
        }),
        new webpack.optimize.UglifyJsPlugin(
            {
                sourceMap: false,
                compress: {
                    pure_getters: true,
                    screw_ie8: true,
                    conditionals: true,
                    comparisons: true,
                    if_return: true,
                    join_vars: true,
                    unused: true,
                    dead_code: true, // big one--strip code that will never execute
                    warnings: false, // good for prod apps so users can't peek behind curtain
                    drop_debugger: true,
                    conditionals: true,
                    evaluate: true,
                    drop_console: true, // strips console statements
                    sequences: true,
                    booleans: true,
                    // 内嵌定义了但是只用到一次的变量
                    collapse_vars: true,
                    // 提取出出现多次但是没有定义成变量去引用的静态值
                    reduce_vars: true,
                },
                beautify: false,
                comments: false,
                exclude: [/\.min\.js$/gi] // skip pre-minified libs
            }
        ),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new BundleAnalyzerPlugin()
    ],
    performance: { hints: false },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        "mobx": "mobx",
        "mobx-react": "mobxReact",
        "rxjs": "Rx",
        "styled-components": "styled"
    },


    resolve: {
        modules: [
            srcPath,
            'node_modules'
        ],
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
            {
                test: /\.jsx$/,
                exclude: /(node_modules)/,
                loaders: ["babel-loader"]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loaders: ["babel-loader"]
            },
            {
                test: /\.css$/,
                exclude: /\.global\.css$/,
                loaders: [
                    'style-loader',
                    'css-loader'
                ]
            },
            { test: /\.scss$/, loaders: ["style-loader", "css-loader", "sass-loader", 'postcss-loader'] },
            { test: /\.less$/, loaders: ["style-loader", "css-loader", "less-loader", 'postcss-loader'] }
        ],
        noParse: /node_modules/
    },

    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, 'dist')
    }
};