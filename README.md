[![@coreui coreui](https://img.shields.io/badge/@coreui%20-coreui-lightgrey.svg?style=flat-square)](https://github.com/coreui/coreui)
[![@coreui react](https://img.shields.io/badge/@coreui%20-react-lightgrey.svg?style=flat-square)](https://github.com/coreui/react)

[npm-coreui]: https://www.npmjs.com/package/@coreui/coreui
[npm-coreui-react]: https://www.npmjs.com/package/@coreui/react
[npm]: https://www.npmjs.com/package/@coreui/react

# Admin UI Base_CoreUI React v3

An Admin Portal based on [CoreUI ReactJs](https://coreui.io/react/) Template.

### Basic Usage

Checkout the source and install run `yarn` to install the dependencies. Then run `yarn start` to bring up the application in local. * You may specify the environemnt in the start script `yarn start:(dev|sit|uat|prod)` to bring up the application with specific configurations.

``` bash
# install all the dependencies
$ yarn
# configure PORT settings in .env file, eg: PORT=3000
# dev server with hot reload at http://localhost:3000
$ yarn start
# for specifc environment, `yarn start:(dev|sit|uat|prod)`
```

### Build

Run `yarn build` to build the project. The build artifacts will be stored in the `build/` directory.

```bash
# build for production with minification
$ yarn build
```

### Prettier

Run `yarn prettier:write` to auto format all files under `src/` directory.

```bash
# build for production with minification
$ yarn prettier:write
```

### Linter

Run `yarn lint` to scan the codes quality against the eslint rules.

```bash
# build for production with minification
$ yarn lint
```

## Folder Structure

High-level folder structured explained:

```
root
├── public/          # static files
│   └── index.html   # html template
│
├── src/             # project root
│   ├── api/         # base httpclient for api request
│   ├── assets/      # assets ie: icons, images, resources
│   ├── components/  # shared components
│   ├── containers/  # static frame/layout of the system
│   ├── helpers/     # shared helpers, utils
│   ├── modules/     # (CORE) all modules and screens
│   ├── redux/       # (CORE) redux state config of modules
│   ├── scss/        # theme, scss/css source
│   ├── App.tsx
│   ├── polyfill.js
│   ├── index.js
│   ├── routes.tsx   # (CORE) routes config of modules
│
└── .env
└── package.json
```

## (CORE) Module Structure

Module folder structured explained:

```
modules
├── [moduleName]/    # module name
│   ├── api/         # module's httpclient for api request
│   ├── components/  # module's shared components
│   ├── mocks/       # module's mocks data
│   ├── model/       # module's types, interface, class
│   ├── navigation/  # module's router configs
│   ├── redux/       # module's redux configs
│   ├── screens/     # module's available screens
│
└── ...
```

## Important Note to Add a New Module

Module's redux configs must be registered in root path `redux/reducer.tsx`

```
import moduleSlice from 'src/modules/[moduleName]/redux/moduleSlice';

const appReducer = combineReducers({
  // add all module reducers
  [moduleName]: moduleSlice,
});
```

Module's route configs must be registered in root path `routes.tsx`

```
import ModuleRoute from './modules/[moduleName]/navigation/ModuleRoute';

const routes: NavigatorRouteType[] = [
  // add all modules navigator route
  ...ModuleRoute,
].concat(...
```

## Issues

--

## References

* CoreUi React Online Demo (https://coreui.io/react/demo/free/3.1.1/#/dashboard)
* CoreUi React documentation (https://coreui.io/react/docs/4.0/)
* CoreUi theming customize (https://coreui.io/docs/4.0/customize/css-variables/)
* CoreUi icons (https://icons.coreui.io/icons/)
* React-Router v5 (https://reactrouter.com/web/guides/quick-start)