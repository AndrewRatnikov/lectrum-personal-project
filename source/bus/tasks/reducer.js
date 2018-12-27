// core
import { handleActions } from 'redux-actions';
import { List } from 'immutable';

// instruments
import { fillTasks, addTask, deleteTask, upadteTask } from './actions';

const initialState = List();

export const tasksReducer = handleActions(
    {
        [ fillTasks ]:  (state, action) => state.merge(action.payload),
        [ addTask ]:    (state, action) => state.push(action.payload),
        [ deleteTask ]: (state, action) => state.filter((item) => item.get('id') !== action.payload),
        [ upadteTask ]: (state, action) => {
            const ids = action.payload.map((item) => item.get('id'));

            return action.payload.concat(
                state.filter((item) => !ids.includes(item.get('id')))
            );
        },
    },
    initialState
);
