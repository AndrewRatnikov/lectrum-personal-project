// Core
import { combineReducers } from 'redux';

// Reducers
import { uiReducer } from '../bus/ui/reducer';

export const rootReducer = combineReducers({
    uiReducer,
});
