import webpack from 'webpack';
import { resolve } from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import { getIfUtils, removeEmpty } from 'webpack-config-utils';

export default env => {
  const { ifProd, ifNotProd } = getIfUtils(env);
  return {
    // ------------------------------------
    // Entry Points
    // ------------------------------------
    entry: {
      app: [
        'index'
      ]
    },

    context: resolve(__dirname, 'client'),

    // ------------------------------------
    // Resolve
    // ------------------------------------
    resolve: {
      extensions: ['.webpack.js', '.web.js', '.js', '.json'],
      modules: [
        resolve(__dirname, 'client'),
        resolve(__dirname, 'node_modules')
      ]
    },

    // ------------------------------------
    // Output
    // ------------------------------------
    output: {
      filename: ifProd('bundle.[name].[chunkhash].js', 'bundle.[name].js'),
      path: resolve(__dirname, 'dist'),
      publicPath: '/'
    },

     // ------------------------------------
    // Module
    // ------------------------------------
    module: {
      rules: removeEmpty([
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  url: true,
                  importLoaders: 1
                }
              },
              { 
                loader: 'postcss-loader',
                options: {
                  plugins: () => [require('precss'), require('autoprefixer')]
                }
              }
            ]
          })
        },
        {
          test: /\.(gif|png|jpe?g|svg)$/i,
          loaders: [
            {
              loader: 'file-loader',
              options: {
                name: './assets/images/[name]-[hash].[ext]'
              }
            },
            {
              loader: 'image-optimize-loader'
            }
          ]
        }
      ])
    },


    // ------------------------------------
    // Plugins
    // ------------------------------------
    plugins: removeEmpty([
      // new ExtractTextPlugin('assets/css/[name].[chunkhash].css'),
      new ExtractTextPlugin("styles.css"),
      new HtmlWebpackPlugin({
        template: resolve(__dirname, 'client/index.html')
      }),
      ifProd(new webpack.LoaderOptionsPlugin({
        // minimize: true,
        debug: true
      })),
    ])
  }
}