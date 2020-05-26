const path = require( 'path' );
const webpack = require( 'webpack' );
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = ( env, options ) => {
    return {
        entry: './src/app.js',

        output: {
            path: path.resolve( __dirname, 'public' ),
            filename: 'bundle.js',
        },

        devtool: 'cheap-eval-source-map',

        module: {
            rules: [
                {
                    test: /\.jsx$|\.es6$|\.js$/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/react'],
                        }
                    },
                    exclude: /(node_modules|bower_components)/
                },
                {
                    test: /\.css$/,
                    use: [
                        'style-loader', 'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [ require( 'autoprefixer' ) ]
                            }
                        },
                    ],
                },
                {
                    test: /\.(png|jpg|gif|svg)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]',
                                outputPath: 'images/'
                            }
                        }
                    ]
                },
            ],
        },

        plugins: [
            new MiniCssExtractPlugin({
                filename: 'app.css',
                chunkFilename: '[id].css'
            })
        ],

    }
};