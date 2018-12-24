import { createAction } from 'redux-actions';

import { START_FETCHING, STOP_FETCHING, EMIT_ERROR } from './constants';

export const emitError = (error, meta) => ({
    type:    EMIT_ERROR,
    payload: error,
    error:   true,
    meta,
});

export const startFetching = createAction(START_FETCHING);

export const stopFetching = createAction(STOP_FETCHING);
