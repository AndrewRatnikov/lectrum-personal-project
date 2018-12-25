// core
import { handleActions } from 'redux-actions';
import { Map } from 'immutable';

// instruments
import { startFetching, stopFetching } from './actions';

const initialState = Map({ isFetching: false });

export const uiReducer = handleActions(
    {
        [ startFetching ]: (state) => state.update('isFetching', () => true),
        [ stopFetching ]:  (state) => state.update('isFetching', () => false),
    },
    initialState
);
