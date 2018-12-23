import { createAction } from 'redux-actions';

import { START_FETCHING, STOP_FETCHING } from './constants';

export const startFetching = createAction(START_FETCHING);

export const stopFetching = createAction(STOP_FETCHING);
