// Core
import React, { Component } from "react";

// Instruments
import Styles from "./styles.m.css";
import { api } from "../../REST"; // ! Импорт модуля API должен иметь именно такой вид (import { api } from '../../REST')
import {
    BaseTaskModel,
    sortTasksByGroup,
    checkLengthHigherFifty
} from "../../instruments/helpers";

// Components
import Checkbox from "../../theme/assets/Checkbox";
import Task from "../Task";

export default class Scheduler extends Component {
    state = {
        newTaskMessage: "",
        tasksFilter:    "",
        tasks:          [],
    };

    _updateTasksFilter = (event) => {
        const { value } = event.target;

        this.setState({ tasksFilter: value.toLowerCase() });
    };

    _updateNewTaskMessage = (event) => {
        const { value } = event.target;

        if (checkLengthHigherFifty(value)) {
            return;
        }

        this.setState({ newTaskMessage: value.toLowerCase() });
    };

    _createTask = (event) => {
        event.preventDefault();
        const { newTaskMessage } = this.state;

        if (!newTaskMessage.length) {
            return;
        }

        this.setState((prevState) => {
            const tasks = [
                {
                    ...new BaseTaskModel(
                        undefined,
                        undefined,
                        undefined,
                        newTaskMessage
                    ),
                    created: new Date(),
                },
                ...prevState.tasks
            ];

            return {
                newTaskMessage: "",
                tasks:          sortTasksByGroup(tasks),
            };
        });
    };

    _saveEditTask = (id) => (message) => {
        this.setState((prevState) => {
            const tasks = [...prevState.tasks];

            tasks[id].message = message;
            tasks[id].created = new Date();

            return { tasks };
        });
    };

    _deleteTask = (id) => () => {
        this.setState((prevState) => {
            const tasks = [...prevState.tasks];

            tasks.splice(id, 1);

            return { tasks };
        });
    };

    _toggleTaskField = (id) => (field) => () => {
        this.setState((prevState) => {
            const tasks = [...prevState.tasks];

            tasks[id][field] = !prevState.tasks[id][field];

            return { tasks: sortTasksByGroup(tasks) };
        });
    };

    render () {
        const { tasksFilter, newTaskMessage, tasks } = this.state;

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
                        <form onSubmit = { this._createTask }>
                            <input
                                placeholder = 'Type new task'
                                type = 'text'
                                value = { newTaskMessage }
                                onChange = { this._updateNewTaskMessage }
                            />
                            <button>Add task</button>
                        </form>
                        <ul>
                            {tasks.map((task, id) => (
                                <Task
                                    key = { task.id }
                                    onCheckedHandler = { this._toggleTaskField(id) }
                                    onDeleteHandler = { this._deleteTask(id) }
                                    onSaveHandler = { this._saveEditTask(id) }
                                    { ...task }
                                />
                            ))}
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
