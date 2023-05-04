

### 1. Create a React Project

```sh
npx create-react-app my-app
cd my-app
```

### 2. Install craco

```sh
npm install @craco/craco --save
```

### 3. Install craco-cesiumext

```sh
npm install craco-cesiumext --save
```

### 4. Install cesium

```sh
npm install cesium --save
```

### 6. Install React-CesiumExt

```sh
npm install @mapuiexts/react-cesiumext --save
```

### 7. Rewrite npm scripts

Rewrite npm scripts in `package.json` as following:

```json
{
  // ...
  "scripts": {
    "start": "craco start", // react-scripts -> craco
    "build": "craco build", // react-scripts -> craco
    "test": "craco test",   // react-scripts -> craco
    "eject": "react-scripts eject"
  },
  // ...
}
```

### 8. Create craco config file

Create `craco.config.js` in the project root:

```sh
module.exports = {
  plugins: [
    {
      plugin: require("craco-cesiumext")()
    }
  ]
};
```

### 9. Congratulations! 🎉

Set up is complete!

You can import Cesium as following:

```sh
import { Viewer, Entity, Color } from "cesium";
```

