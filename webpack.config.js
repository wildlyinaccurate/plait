const webpack = require('webpack')
const glob = require('glob')
const path = require('path')
const BabiliPlugin = require('babili-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const moduleConfig = {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }
  ]
}

const processEnvPlugin = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production')
  }
})

const configs = [
  {
    mode: 'production',
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'plait.min.js',
      library: 'Plait'
    },

    module: moduleConfig,

    plugins: [new BabiliPlugin(), processEnvPlugin]
  },
  {
    mode: 'development',
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'plait.js',
      library: 'Plait'
    },

    devtool: 'source-map',

    module: moduleConfig,

    plugins: [
      processEnvPlugin,

      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
        reportFilename: 'webpack-bundle-analyzer.html'
      })
    ]
  }
]

glob.sync('./examples/src/*/Main.js').forEach(exampleEntry => {
  configs.push({
    mode: 'development',
    entry: exampleEntry,
    output: {
      path: path.resolve(__dirname, 'examples/dist'),
      filename: path.relative('./examples/src', path.dirname(exampleEntry)) + '.js'
    },

    resolve: {
      alias: {
        plait: path.resolve(__dirname, 'src/index'),
        Static: path.resolve(__dirname, 'src/Static')
      }
    },

    module: moduleConfig,

    plugins: [processEnvPlugin]
  })
})

module.exports = configs
