// core
import { handleActions } from "redux-actions";
import { fromJS, List } from "immutable";

// instruments
import { fillTasks, addTask, deleteTask, upadteTask } from "./actions";

const initialState = List();

export const tasksReducer = handleActions(
    {
        [fillTasks]:  (state, action) => state.merge(fromJS(action.payload)),
        [addTask]:    (state, action) => state.push(action.payload),
        [deleteTask]: (state, action) =>
            state.filter((item) => item.id !== action.payload),
        [upadteTask]: (state, action) => state.merge(fromJS(action.payload)),
    },
    initialState
);
