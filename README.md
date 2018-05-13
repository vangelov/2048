
# 2048

An implementation of the popular game.

## Additional features:

* Undo
* Retaining the game state between page reloads
* Custom size for the board

**Note**: If you select undo several times and then use the same moves to go back to the state before the undo, the app will insert the same symbols at the same positions.

Missing features:

* Animations
* Mobile support

## How to run it

- `yarn/npm install`
- `yarn/npm start`

This runs the app in development. In order to build it for production run:

* `yarn/npm build`

## Running Tests

* `yarn/npm test`

### Folder organization

*  `/App`: Contains all components. This folder has the following recursive tree structure and file name conventions:

    	        /ComponentX
                    /ComponentY
                    /ComponentZ 
                    index.js
                    style.css

    The file tree structure mimics the render tree on the DOM, i.e. if `ComponentX` contains or may contain `ComponentY` or `ComponentZ` as children, the last two are subfolders of the `/ComponentX` folder. This organization allows us to easily see the UI structure of app.

 * `/state`: Contains all code related to the app state: actions, selectors, reducers, etc. The folder is organized by the reducer name in the store. It has the following recursive tree structure and file name conventions:

                /reducerNameInTheStoreX
                    /reducerNameInTheStoreY
                    /reducerNameInTheStoreZ
                    reducer/reducerMaker.js
                    reducer/reducerMaker.test.js
                    selectors.js
                    selectors.test.js
                    actions.js
                    test.js
