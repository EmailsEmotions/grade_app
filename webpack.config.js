const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: {
        index: './src/ts/index.ts'
    },
    output: {
        filename: '[name].js',
        path: `${__dirname}/dist/js`,
        publicPath: '../',
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [{
                test: /\.ts$/,
                exclude: /(node_modules|bower_components)/,
                use: [{
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                        }
                    },
                    'ts-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.html$/,
                use: [{
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: '../'
                        }
                    },
                    {
                        loader: 'extract-loader'
                    },
                    {
                        loader: 'html-loader',
                        options: {
                            attributes: [
                                ':srcset',
                                'img:src',
                                'audio:src',
                                'video:src',
                                'track:src',
                                'embed:src',
                                'source:src',
                                'input:src',
                                'object:data',
                                'script:src'
                            ]
                        }
                    }
                ]
            },
            {
                test: /Logo.{2}\.png$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: '../icon/',
                        publicPath: 'icon/'
                    }
                }
            },
            {
                test: /\/images\/.*\.(svg|png|jpg|gif|jpeg)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name]-[contentHash].[ext]',
                        outputPath: '../images/',
                        publicPath: 'images/'
                    }
                }
            },
            {
                test: /\/icons\/.*\.(svg|png|jpg|gif|jpeg)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name]-[contentHash].[ext]',
                        outputPath: '../icons/',
                        publicPath: 'icons/'
                    }
                }
            },
            {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: '../fonts/',
                        publicPath: '../fonts/'
                    }
                }]
            }
        ]
    },
    optimization: {
        minimizer: [
            new OptimizeCssAssetsPlugin(),
            new TerserPlugin(),
            // new HtmlWebpackPlugin({
            //     template: './src/template.html',
            //     minify: {
            //         removeAttributeQuotes: true,
            //         collapseWhitespace: true,
            //         removeComments: true
            //     }
            // })
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '../css/[name].css'
        })
        // new CleanWebpackPlugin()
    ]
};
