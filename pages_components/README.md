# pages_components
A library of React components created using `create-react-app`.
## Installation
Run the following command:
`npm install pages_components`

# Creating a library of React components using Create React App
https://hackernoon.com/creating-a-library-of-react-components-using-create-react-app-without-ejecting-d182df690c6b

### 1. Create a new project using create-react-app:
```
create-react-app pages_components
```

### 2. Create a new folder src/lib and place your React components inside it. src/lib will serve as the root folder of the module published to npm.

Finally, the component can be exported from src/lib for ease of importing:

```
import TextInput from "./TextInput";
export { TextInput };
```

### 3. Install babel-cli using the command npm i babel-cli --save-dev and create a file .babelrc in the root of the project with the following contents:
```
{
  "presets": ["react-app"]
}
```

### 4. Replace the build script inside package.json with the following:
```
"build": "rm -rf dist && NODE_ENV=production babel src/lib --out-dir dist --copy-files --ignore __tests__,spec.js,test.js,__snapshots__"
```
The command npm run build will now transpile the code inside src/lib (ignoring tests and snapshots) into the folder dist.

### 5. Remove `react-scripts`, `react` and `react-dom` from dependencies, and move them to `devDependencies`. Additionally, you can also add `react` and `react-dom` to `peerDependencies`.

 ### 6. To prepare for publishing, add the following lines to package.json:

```
"main": "dist/index.js",
"module": "dist/index.js",
"files": [ "dist", "README.md" ],
"repository": {
  "type": "git",
  "url": "URL_OF_YOUR_REPOSITORY"
}
```
