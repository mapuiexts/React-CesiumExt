
// The path to the CesiumJS source code
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');

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
const prod = process.env.NODE_ENV === 'production';

console.log('is prod?: ', prod);

console.log('include: path.resolve(__dirname, cesiumSource)', path.resolve(__dirname, cesiumSource));

module.exports = {
    devtool: 'eval-source-map',
    //clsiumPath: "cesium",
    context: __dirname,
    // entry: {
    //     app: './src/index.js'
    // },
    /*
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist'),
        // Needed to compile multiline strings in Cesium
        sourcePrefix: ''
    },
    */
    
    amd: {
        // Enable webpack-friendly use of require in Cesium
        toUrlUndefined: true
    },
    // node: {
    //     // Resolve node module use of fs
    //     fs: 'empty'
    // },

    //devtool: 'eval-source-map', //https://stackoverflow.com/questions/61767538/devtools-failed-to-load-sourcemap-for-webpack-node-modules-js-map-http-e
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json' ],
        fallback: {
          https: require.resolve("https-browserify"),
          zlib: require.resolve("browserify-zlib"),
          stream: require.resolve("stream-browserify"),
          http: require.resolve("stream-http")
        },

        alias: {
            //cesium: path.resolve(__dirname, cesiumSource)
            cesium$: "cesium/Cesium",
            cesium: "cesium/Source"
        },
        mainFiles: ['module', 'main', 'Cesium', 'index']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                //cesium config:
                //enforce: "pre",
                //include: path.resolve(__dirname, cesiumSource),
                //include: /node_modules/,
                //sideEffects: false,
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

            // {
            //   test: /\.(jpe?g|png|gif|ico)$/i,
            //   type: 'asset/resource',
            //   generator: {
            //     filename: 'img/[name].[ext]'
            //   }
            // },
            // {
            //   test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            //   type: 'asset/resource'
            // },
            {
                test: /\.(ttf|eot|svg|kml)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                type: 'asset/resource'
            }
        ]
    },
    
    plugins: [

       
        // new HtmlWebpackPlugin({
        //      //template: 'src/index.html'
        // }),
        // new HtmlWebpackTagsPlugin({
        //     append: false,
        //     tags: [path.join(cesiumPath, "Widgets", "widgets.css")]
        // }),

        new webpack.DefinePlugin({
            // Define relative base path in cesium for loading assets
            CESIUM_BASE_URL: JSON.stringify(cesiumPath)
        }),
        
        // Copy Cesium Assets, Widgets, and Workers to a static directory
        new CopyWebpackPlugin({ 
            patterns: [
                {from: path.join(cesiumSource, 'Assets'), to: path.join(cesiumPath, "Assets")},
                {from: path.join(cesiumSource, 'ThirdParty'), to: path.join(cesiumPath, 'ThirdParty')},
                {from: path.join(cesiumSource, 'Widgets'), to: path.join(cesiumPath, 'Widgets')},
                //{from: path.join(cesiumSource, 'Workers'), to: path.join(cesiumPath, 'Workers')},
                {from: path.join(cesiumSource, '../Build/Cesium/ThirdParty/Workers'), to: path.join(cesiumPath, 'ThirdParty/Workers'), force: true},
                {from: path.join(cesiumSource, '../Build/Cesium/Workers'), to: path.join(cesiumPath, 'Workers'), force: true}
                // {
                //     from: path.join(cesiumSource, "../Build/Cesium/Workers"),
                //     to: path.join(cesiumPath, "Workers")
                // },
                // {
                //     from: path.join(cesiumSource, "../Build/Cesium/ThirdParty"),
                //     to: path.join(cesiumPath, "ThirdParty")
                // },
                // {
                //     from: path.join(cesiumSource, "Assets"),
                //     to: path.join(cesiumPath, "Assets")
                // },
                // {
                //     from: path.join(cesiumSource, "Widgets"),
                //     to: path.join(cesiumPath, "Widgets")
                // }
            ]
        }),
         
    ],
    //mode: 'development',
};