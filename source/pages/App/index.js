// Core
import React, { Component } from "react";
import { hot } from "react-hot-loader";
import { Provider } from "mobx-react";

// Instruments
import { tasksStore } from "../../store";

// Components
import Scheduler from "../../components/Scheduler";

@hot(module)
export default class App extends Component {
    render () {
        return (
            <Provider tasksStore = { tasksStore }>
                <Scheduler />
            </Provider>
        );
    }
}
