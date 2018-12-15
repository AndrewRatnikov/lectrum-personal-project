// Core
import { compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();
const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = __DEV__ && devtools ? devtools : compose;

const middleware = [ sagaMiddleware ];

export { composeEnhancers, middleware, sagaMiddleware };
