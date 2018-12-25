import { handleActions } from 'redux-actions';

import { fillTasks, addTask, deleteTask, upadteTask } from './actions';

const initialState = [];

export const tasksReducer = handleActions(
    {
        [ fillTasks ]:  (state, action) => [ ...action.payload ],
        [ addTask ]:    (state, action) => [ ...state, action.payload ],
        [ deleteTask ]: (state, action) => state.filter((item) => item.id !== action.payload),
        [ upadteTask ]: (state, action) => [ ...state, ...action.payload ],
    },
    initialState
);
