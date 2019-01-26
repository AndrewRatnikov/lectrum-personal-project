// Core
import React, { Component } from "react";
import FlipMove from "react-flip-move";
import { inject, observer } from "mobx-react";

// Instruments
import Styles from "./styles.m.css";
import { api } from "../../REST"; // ! Импорт модуля API должен иметь именно такой вид (import { api } from '../../REST')
import { sortTasksByGroup, checkLengthHigherFifty } from "../../instruments";

// Components
import Checkbox from "../../theme/assets/Checkbox";
import Task from "../Task";
import Spinner from "../Spinner";

@inject("tasksStore")
@observer
export default class Scheduler extends Component {
    state = {
        newTaskMessage: "",
        tasksFilter:    "",
        tasks:          [],
        fetching:       false,
    };

    componentDidMount () {
        // this._fetchTasksAsync();
        this.props.tasksStore.fetchTasks();
    }

    // _showSpinner = () => this.setState({ fetching: true });

    // _hideSpinner = () => this.setState({ fetching: false });

    // _fetchTasksAsync = async () => {
    //     try {
    //         this._showSpinner();
    //         const tasks = await api.fetchTasks();

    //         this.setState({ tasks: sortTasksByGroup(tasks) });
    //     } finally {
    //         this._hideSpinner();
    //     }
    // };

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
            this._showSpinner();
            const { newTaskMessage: message } = this.state;
            const task = await api.createTask({ message });

            this.setState((prevState) => {
                const tasks = [task, ...prevState.tasks];

                return { tasks: sortTasksByGroup(tasks), newTaskMessage: "" };
            });
        } finally {
            this._hideSpinner();
        }
    };

    _saveEditTask = (id) => (message) => {
        const { tasks } = this.state;
        const task = { ...tasks[id] };

        task.message = message;

        this._updateTaskAsync(id, [task]);
    };

    _updateTaskAsync = async (id, tasks) => {
        try {
            this._showSpinner();
            const changedTasks = await api.updateTask(tasks);

            if (Number.isInteger(id)) {
                this._updateOneTask(id, changedTasks);
            } else {
                this._updateAllTask(changedTasks);
            }
        } finally {
            this._hideSpinner();
        }
    };

    _updateOneTask = (id, tasks) => {
        this.setState((prevState) => {
            const updatedTasks = [...prevState.tasks];

            updatedTasks[id] = tasks[0];

            return { tasks: sortTasksByGroup(updatedTasks) };
        });
    };

    _updateAllTask = (tasks) => {
        this.setState({ tasks: sortTasksByGroup(tasks) });
    };

    _deleteTask = (id) => () => {
        this._deleteTaskAsync(id);
    };

    _deleteTaskAsync = async (id) => {
        try {
            this._showSpinner();
            const { tasks } = this.state;

            await api.deleteTask(tasks[id].id);
            this.setState((prevState) => {
                const newTasks = [...prevState.tasks];

                newTasks.splice(id, 1);

                return { tasks: newTasks };
            });
        } finally {
            this._hideSpinner();
        }
    };

    _toggleTaskField = (id) => (field) => () => {
        const task = { ...this.state.tasks[id] };

        task[field] = !this.state.tasks[id][field];
        this._updateTaskAsync(id, [task]);
    };

    _completeAllTasks = () => {
        const { tasks } = this.state;
        const updatedTasks = tasks.map((item) => {
            item.completed = true;

            return item;
        });

        this._updateTaskAsync(null, updatedTasks);
    };

    render () {
        const { tasksFilter, newTaskMessage } = this.state;
        const { fetching, sortedTasks } = this.props.tasksStore;

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
                            {sortedTasks
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
