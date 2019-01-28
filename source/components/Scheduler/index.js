// Core
import React, { Component } from "react";
import FlipMove from "react-flip-move";
import { inject, observer } from "mobx-react";

// Instruments
import Styles from "./styles.m.css";
import { checkLengthHigherFifty } from "../../instruments";

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
        this.props.tasksStore.fetchTasks();
    }

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

        this.props.tasksStore.createTask(newTaskMessage);
        this.setState({ newTaskMessage: "" });
    };

    _saveEditTask = (id) => (message) => {
        const { sortedTasks: tasks } = this.props.tasksStore;
        const task = { ...tasks[id] };

        task.message = message;

        this.props.tasksStore.updateTask([task]);
    };

    _deleteTask = (id) => () => {
        const { sortedTasks } = this.props.tasksStore;

        this.props.tasksStore.deleteTask(sortedTasks[id]);
    };

    _toggleTaskField = (id) => (field) => () => {
        const { sortedTasks: tasks } = this.props.tasksStore;
        const task = { ...tasks[id] };

        task[field] = !tasks[id][field];
        this.props.tasksStore.updateTask([task]);
    };

    _completeAllTasks = () => {
        const { sortedTasks: tasks } = this.props.tasksStore;
        const updatedTasks = tasks.map((item) => {
            item.completed = true;

            return item;
        });

        this.props.tasksStore.updateTask(updatedTasks);
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
