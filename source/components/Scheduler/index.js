// Core
import React, { Component } from "react";

// Instruments
import Styles from "./styles.m.css";
import { api } from "../../REST"; // ! Импорт модуля API должен иметь именно такой вид (import { api } from '../../REST')

// Components
import Checkbox from "../../theme/assets/Checkbox";
import Task from "../Task";

export default class Scheduler extends Component {
    state = {
        newTaskMessage:  "",
        tasksFilter:     "",
        isTasksFetching: false,
        tasks:           [],
    };

    _updateTasksFilter = (event) => {
        const { value } = event.target;

        this.setState({ tasksFilter: value.toLowerCase() });
    };

    _updateNewTaskMessage = (event) => {
        const { value } = event.target;

        this.setState({ newTaskMessage: value });
    };

    render () {
        const { tasksFilter, newTaskMessage } = this.state;

        return (
            <section className = { Styles.scheduler }>
                <main>
                    <header>
                        <h1>Task Manager</h1>
                        <input
                            placeholder = 'Search'
                            type = 'search'
                            value = { tasksFilter }
                            onChange = { this._updateTasksFilter }
                        />
                    </header>
                    <section>
                        <form>
                            <input
                                placeholder = 'Type new task'
                                type = 'text'
                                value = { newTaskMessage }
                                onChange = { this._updateNewTaskMessage }
                            />
                            <button>Add task</button>
                        </form>
                        <ul>
                            <Task />
                        </ul>
                    </section>
                    <footer>
                        <Checkbox color1 = '#363636' color2 = '#fff' />
                        <span className = { Styles.completeAllTasks }>
                            Complete all tasks
                        </span>
                    </footer>
                </main>
            </section>
        );
    }
}
