import webpack from 'webpack';
import { resolve } from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { getIfUtils, removeEmpty } from 'webpack-config-utils';

export default env => {
  const { ifProd, ifNotProd } = getIfUtils(env);
  return {
    // ------------------------------------
    // Entry Points
    // ------------------------------------
    entry: {
      app: [
        'index.js'
      ]
    },

    context: resolve(__dirname, 'src'),

    // ------------------------------------
    // Resolve
    // ------------------------------------
    resolve: {
      extensions: ['.webpack.js', '.web.js', '.js', '.json'],
      modules: [
        resolve(__dirname, 'src'),
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
          use: [
            'style-loader', 
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
        },
        {
          test: /\.(gif|png|jpe?g|svg)$/i,
          loaders: [
            'file-loader',
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
      new HtmlWebpackPlugin({
        template: resolve(__dirname, 'src/index.html')
      }),
    ])
  }
}