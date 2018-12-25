// Core
import { combineReducers } from 'redux-immutable';

// Reducers
import { uiReducer as ui } from '../bus/ui/reducer';
import { tasksReducer as tasks } from '../bus/tasks/reducer';

export const rootReducer = combineReducers({
    ui,
    tasks,
});
