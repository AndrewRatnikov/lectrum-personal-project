import { handleActions } from 'redux-actions';

import { startFetching, stopFetching } from './actions';

const initialState = { isFetching: false };

export const uiReducer = handleActions(
    {
        [ startFetching ]: (state) => ({ ...state, isFetching: true }),
        [ stopFetching ]:  (state) => ({ ...state, isFetching: false }),
    },
    initialState
);
