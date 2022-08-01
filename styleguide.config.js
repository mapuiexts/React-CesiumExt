const path = require('path');
const webpackConfig = require('./webpack.base.config.js');


module.exports = {
    //
    webpackConfig, //https://github.com/styleguidist/react-styleguidist/issues/1910, https://gist.github.com/nebomilic/938f93695b4ed6756fb37db757aca06f
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
    //
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
        link: '#61dafb',
        linkHover: 'salmon',
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
        sectionDepth: 1,
        sections: [
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
          }
        ]
      },
      {
        name: 'Glossary',
        content: 'docs/glossary.md'
      },
    ]
}