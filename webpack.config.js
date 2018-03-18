const path = require('path');

module.exports = {
    devtool: '#source-map',
    mode: 'production',
    entry: ['./src/index.js'],
    output: {
        library: "big-brother",
        libraryTarget: "umd",
        path: path.resolve(__dirname, "dist"),
        filename: "big-brother.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }        ]
    },
    externals: {
        'react': 'commonjs react'
    }
};
