# big-brother

## example of usage

### add to index.html
```html
<div id='bb'></div>
```

### render Journey
```jsx
import React from 'react';
import ReactDom from 'react-dom';
import { BBUI } from 'big-brother';

ReactDOM.render(<BBUI />, document.getElementById('bb'));

### for react-native apps - import hoc:
import withRecorder from 'big-brother/src/react-native';

#### also run:
//react-native link react-native-blur
```

## rewrite your's root reducer
```js
const appReducer = combineReducers({posts, modals});

const rootReducer = (state, action) => {
    if (action.type === 'JOURNEY_REPRODUCING') {
        return action.initialState;
    }

    return appReducer(state, action)
}
```

### configure middleware and init bb-connector
```js
import { bbConnector, bbMiddleware, bbMLabProvider } from 'big-brother';

const middleware = applyMiddleware(bbMiddleware, thunk, logger());
const store = createStore(rootReducer, defaultState, middleware);

const apiProvider = bbMLabProvider({
    dbName: 'my-package',
    collName: 'journey',
    apiKey: 'Orf_sZpA2Pp2O5JdEoVUOZqq5dcRpeO5',
});
bbConnector(store, rootReducer, apiProvider);

```