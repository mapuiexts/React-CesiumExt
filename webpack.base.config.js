// The path to the CesiumJS source code
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTagsPlugin = require("html-webpack-tags-plugin");

let pnp;
try {
  pnp = require("pnpapi");
} catch (error) {
  // not in PnP; not a problem
}

let cesiumSource;
if (pnp) {
  // Craco Cesium using Pnp
  const topLevelLocation = pnp.getPackageInformation(pnp.topLevel)
    .packageLocation;
  cesiumSource = path.resolve(
    pnp.resolveToUnqualified("cesium", topLevelLocation, {
      considerBuiltins: false
    }),
    "Source"
  );
} else {
  // Craco Cesium using normal module
  cesiumSource = "node_modules/cesium/Source";
}

const cesiumPath = "cesium";

module.exports = {
    context: __dirname,
    entry: {
        app: './src/index.js'
    },
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist'),
        // Needed to compile multiline strings in Cesium
        sourcePrefix: ''
    },
    amd: {
        // Enable webpack-friendly use of require in Cesium
        toUrlUndefined: true
    },

    devtool: 'eval-source-map', //https://stackoverflow.com/questions/61767538/devtools-failed-to-load-sourcemap-for-webpack-node-modules-js-map-http-e
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json' ],

        alias: {
            cesium: path.resolve(__dirname, cesiumSource)
        },
        mainFiles: ['module', 'main', 'Cesium', 'index']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }, 
            //enable if using craco/less
            // {
            //     test: /\.less$/,
            //     use: [
            //     'style-loader',
            //     'css-loader',
            //     {
            //         loader: 'less-loader',
            //         options: {
            //         lessOptions: {
            //             javascriptEnabled: true
            //         }
            //         }
            //     }
            //     ]
            // }, 

            // {
            //     test: /\.(png|gif|jpg|jpeg|svg|xml|json)$/,
            //     use: [ 'url-loader' ]
            // },

            {
                test: /\.(ttf|eot|svg|kml)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                type: 'asset/resource'
            }
        ]
    },
    
    plugins: [

       
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        
        // Copy Cesium Assets, Widgets, and Workers to a static directory
        new CopyWebpackPlugin({ 
            patterns: [
                {
                    from: path.join(cesiumSource, "../Build/Cesium/Workers"),
                    to: path.join(cesiumPath, "Workers")
                },
                {
                    from: path.join(cesiumSource, "../Build/Cesium/ThirdParty"),
                    to: path.join(cesiumPath, "ThirdParty")
                },
                {
                    from: path.join(cesiumSource, "Assets"),
                    to: path.join(cesiumPath, "Assets")
                },
                {
                    from: path.join(cesiumSource, "Widgets"),
                    to: path.join(cesiumPath, "Widgets")
                }
            ]
        }),

        // new HtmlWebpackTagsPlugin({
        //     append: false,
        //     tags: [path.join(cesiumPath, "Widgets", "widgets.css")]
        // }),
        

        new webpack.DefinePlugin({
            // Define relative base path in cesium for loading assets
            CESIUM_BASE_URL: JSON.stringify(cesiumPath)
        })
    ],
};