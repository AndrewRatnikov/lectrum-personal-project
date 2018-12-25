import { handleActions } from 'redux-actions';

import { fillTasks, addTask, deleteTask } from './actions';

const initialState = [];

export const tasksReducer = handleActions(
    {
        [ fillTasks ]:  (state, action) => [ ...state, ...action.payload ],
        [ addTask ]:    (state, action) => [ ...state, action.payload ],
        [ deleteTask ]: (state, action) => state.filter((item) => item.id !== action.payload),
    },
    initialState
);
