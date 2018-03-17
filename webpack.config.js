const path = require('path');

module.exports = {
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
            }
        ]
    },
    externals: {
        'react': 'commonjs react'
    }
};
