// Core
import { createStore, applyMiddleware } from 'redux';
import { Map } from 'immutable';

// Instruments
import { rootReducer } from './rootReducer';
import { rootSaga } from './rootSaga';
import { composeEnhancers, middleware, sagaMiddleware } from './middleware';

export const store = createStore(
    rootReducer,
    Map(),
    composeEnhancers(applyMiddleware(...middleware))
);

sagaMiddleware.run(rootSaga);
