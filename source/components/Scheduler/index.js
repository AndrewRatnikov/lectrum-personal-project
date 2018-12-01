// Core
import React, { Component } from "react";
import FlipMove from "react-flip-move";

// Instruments
import Styles from "./styles.m.css";
import { api } from "../../REST"; // ! Импорт модуля API должен иметь именно такой вид (import { api } from '../../REST')
import {
    BaseTaskModel,
    sortTasksByGroup,
    checkLengthHigherFifty
} from "../../instruments";

// Components
import Checkbox from "../../theme/assets/Checkbox";
import Task from "../Task";
import Spinner from "../Spinner";

export default class Scheduler extends Component {
    state = {
        newTaskMessage: "",
        tasksFilter:    "",
        tasks:          [],
        fetching:       false,
    };

    componentDidMount () {
        this._fetchTasksAsync();
    }

    _fetchTasksAsync = async () => {
        try {
            this.setState({ fetching: true });
            const tasks = await api.fetchTasks();

            this.setState({ tasks });
        } finally {
            this.setState({ fetching: false });
        }
    };

    _updateTasksFilter = (event) => {
        const { value } = event.target;

        this.setState({ tasksFilter: value });
    };

    _updateNewTaskMessage = (event) => {
        const { value } = event.target;

        if (checkLengthHigherFifty(value)) {
            return;
        }

        this.setState({ newTaskMessage: value });
    };

    _createTask = (event) => {
        event.preventDefault();
        const { newTaskMessage } = this.state;

        if (!newTaskMessage.length) {
            return;
        }

        this._createTaskAsync();
    };

    _createTaskAsync = async () => {
        try {
            this.setState({ fetching: true });
            const { newTaskMessage: message } = this.state;
            const task = await api.createTask({ message });

            console.log(task);
            this.setState((prevState) => {
                const tasks = [task, ...prevState.tasks];

                return { tasks };
            });
        } finally {
            this.setState({ fetching: false });
        }
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
        this._deleteTaskAsync(id);
        // this.setState((prevState) => {
        //     const tasks = [...prevState.tasks];

        //     tasks.splice(id, 1);

        //     return { tasks };
        // });
    };

    _deleteTaskAsync = async (id) => {
        try {
            const { tasks } = this.state;

            this.setState({ fetching: true });
            await api.deleteTask(tasks[id].id);
            this.setState((prevState) => {
                const tasks = [...prevState.tasks];

                tasks.splice(id, 1);

                return { tasks };
            });
        } finally {
            this.setState({ fetching: false });
        }
    };

    _toggleTaskField = (id) => (field) => () => {
        this.setState((prevState) => {
            const tasks = [...prevState.tasks];

            tasks[id][field] = !prevState.tasks[id][field];

            return { tasks: sortTasksByGroup(tasks) };
        });
    };

    _completeAllTasks = () => {
        this.setState((prevState) => ({
            tasks: prevState.tasks.map((item) => {
                item.completed = true;

                return item;
            }),
        }));
    };

    render () {
        const { tasksFilter, newTaskMessage, tasks, fetching } = this.state;

        return (
            <section className = { Styles.scheduler }>
                <main>
                    <header>
                        <h1>Task Manager</h1>
                        {fetching && <Spinner />}
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
                            <button disabled = { fetching }>Add task</button>
                        </form>
                        <FlipMove delay = { 100 } typeName = 'ul'>
                            {tasks
                                .filter((task) =>
                                    task.message
                                        .toLowerCase()
                                        .includes(tasksFilter.toLowerCase())
                                )
                                .map((task, id) => (
                                    <Task
                                        key = { task.id }
                                        onCheckedHandler = { this._toggleTaskField(
                                            id
                                        ) }
                                        onDeleteHandler = { this._deleteTask(id) }
                                        onSaveHandler = { this._saveEditTask(id) }
                                        { ...task }
                                    />
                                ))}
                        </FlipMove>
                    </section>
                    <footer>
                        <Checkbox
                            color1 = '#363636'
                            color2 = '#fff'
                            onClick = { this._completeAllTasks }
                        />
                        <span className = { Styles.completeAllTasks }>
                            Complete all tasks
                        </span>
                    </footer>
                </main>
            </section>
        );
    }
}
