// Core
import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';

// Instruments
import './theme/init';
import { store } from './init/store';

// App
import App from './pages/App';

render(
    <Provider store = { store }>
        <App />
    </Provider>,
    document.getElementById('app')
);
