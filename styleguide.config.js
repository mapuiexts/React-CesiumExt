const path = require('path');
const webpackConfig = require('./webpack.base.config.js');

const cesiumSource = "node_modules/cesium/Source";

module.exports = {
    //
    moduleAliases: {
      'cesium': path.resolve(__dirname, cesiumSource)
    },
    webpackConfig, 
    components: 'src/**/*.{js,jsx,tsx}',
    getExampleFilename(componentPath) {
      return componentPath.replace(/\.js?$/, '.md');
    },
    getComponentPathLine(componentPath) {
      const fileName = path.basename(componentPath, '.js');
      let dir = path.dirname(componentPath).replace('src', 'dist');
      dir = dir.split(path.sep).join("/");
      return `import ${fileName} from '@mapuiexts/react-cesiumext/${dir}/${fileName}';`;
    },
    pagePerSection: true,
    assetsDir: './docs',
    tocMode: 'collapse',
    title: 'React-CesiumExt',
    version: '0.1.x Beta',
    styles: {
      Logo: {
        logo: {
          // we can now change the color used in the logo item to use the theme's `link` color
          color: '#61dafb'
        }
      }
    },
    theme: {
      sidebarWidth: '20%',
      maxWidth: 1300,
      color: {
        //base: '61dafb',
        //link: 'firebrick',
        linkHover: '#61dafb',
        link: 'salmon',
        sidebarBackground: '#000000 ',
        codeBase:'#FFF',
        baseBackground: '#FFF',
        codeBackground: '#000000',
        codeProperty: 'rgb(252, 146, 158)',
        codeString: 'rgb(250, 200, 99)',
        codeKeyword: 'rgb(197, 165, 197)',
        codeFunction:'rgb(121, 182, 242);',
        codePunctuation: 'rgb(136, 198, 190)',
        codeOperator: 'rgb(215, 222, 234)',
        codeComment: 'rgb(178, 178, 178)'
      },
    },
    //sectionDepth: 1,
    sections: [
      {
        name: 'Introduction',
        content: 'docs/introduction.md'
      },
      {
        name: 'Installation',
        content: 'docs/installation.md',
      },
      /*
      {
        name: 'Configuration',
        description: 'To be added',
        content: 'docs/configuration.md'
      },
      */
      {
        name: 'Live Demo',
        //description: 'To be added',
        //external: true,
        //href: 'http://example.com'
        content: 'docs/live_demo.md'
      },
      {
        name: 'UI Components',
        description: 'All the React-CesiumExt Components',
        sectionDepth: 3,
        sections: [
          {
            name: 'button',
            sections:[
              {
                name: 'common',
                description: 'All the common buttons',
                components: [
                  'src/components/button/common/**/*.{js,jsx,ts,tsx}'
                ],
                exampleMode: 'expand', 
                usageMode: 'expand',
              },
              {
                name: 'coordinate',
                description: 'All the buttons to interact with coordinate position',
                components: [
                  'src/components/button/coordinate/**/*.{js,jsx,ts,tsx}'
                ],
                exampleMode: 'expand', 
                usageMode: 'expand',
              },
              {
                name: 'dataSource',
                description: 'All the buttons to interact with Cesium DataSource',
                components: [
                  'src/components/button/dataSource/**/*.{js,jsx,ts,tsx}'
                ],
                exampleMode: 'expand', 
                usageMode: 'expand',
              },
              {
                name: 'draw',
                description: 'All the buttons with functionality to draw Cesium entities',
                components: [
                  'src/components/button/draw/**/*.{js,jsx,ts,tsx}'
                ],
                exampleMode: 'expand', 
                usageMode: 'expand',
              },
              {
                name: 'imagery layer',
                components: [
                  'src/components/button/imageryLayer/**/*.{js,jsx,ts,tsx}'
                ],
                exampleMode: 'expand', 
                usageMode: 'expand',
              },
              
            ]
          },
          {
            name: 'panel',
            //content: 'docs/ui.md',
            components: [
              'src/components/panel/**/*.{js,jsx,ts,tsx}'
            ],
            ignore: [
              'src/components/panel/Panel/Expander/**/*.{js,jsx,ts,tsx}',
              'src/components/panel/Panel/Header/**/*.{js,jsx,ts,tsx}'
            ],
            //sectionDepth: 3,
            exampleMode: 'expand', // 'hide' | 'collapse' | 'expand'
            usageMode: 'expand' // 'hide' | 'collapse' | 'expand'
          },
          
          {
            name: 'grid',
            sections:[
              {
                name: 'entity',
                components: [
                  'src/components/grid/entity/**/*.{js,jsx,ts,tsx}'
                ],
                exampleMode: 'expand', 
                usageMode: 'expand' 
              }
            ]
          },
          
          {
            name: 'tree',
            sections:[
              {
                name: 'imageryLayer',
                components: [
                  'src/components/tree/imageryLayer/**/*.{js,jsx,ts,tsx}'
                ],
                exampleMode: 'expand', // 'hide' | 'collapse' | 'expand'
                usageMode: 'expand' // 'hide' | 'collapse' | 'expand'
              },
              {
                name: 'dataSource',
                components: [
                  'src/components/tree/dataSource/**/*.{js,jsx,ts,tsx}'
                ],
                exampleMode: 'expand', // 'hide' | 'collapse' | 'expand'
                usageMode: 'expand' // 'hide' | 'collapse' | 'expand'
              }
            ]
          },
          {
            name: 'widget',
            sections:[
              {
                name: 'viewer',
                components: [
                  'src/components/widget/viewer/**/*.{js,jsx,ts,tsx}'
                ],
                exampleMode: 'expand', // 'hide' | 'collapse' | 'expand'
                usageMode: 'expand' // 'hide' | 'collapse' | 'expand'
              }
            ]
          },
          {
            name: 'window',
            //content: 'docs/ui.md',
            sections: [
              {
                name: 'base',
                components: [
                  'src/components/window/base/**/*.{js,jsx,ts,tsx}'
                ],
                exampleMode: 'expand', // 'hide' | 'collapse' | 'expand'
                usageMode: 'expand' // 'hide' | 'collapse' | 'expand'
              }
            ]
          }
        ]
      },
      {
        name: 'Glossary',
        content: 'docs/glossary.md'
      },
    ],
    
}