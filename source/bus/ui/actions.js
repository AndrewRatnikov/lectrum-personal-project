import { createAction } from 'redux-actions';

import { START_FETCHING, STOP_FETCHING, EMIT_ERROR } from './constants';

export const emitError = createAction(
    EMIT_ERROR,
    (error) => error,
    (meta) => meta
);

export const startFetching = createAction(START_FETCHING);

export const stopFetching = createAction(STOP_FETCHING);
