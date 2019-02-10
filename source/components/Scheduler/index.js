// Core
import React, { Component } from "react";
import PropTypes from "prop-types";
import FlipMove from "react-flip-move";
import { connect } from "react-redux";
import { List } from "immutable";

// Instruments
import Styles from "./styles.m.css";
import { sortTasksByGroup, checkLengthHigherFifty } from "../../instruments";
import {
    fetchTasksAsync,
    createTaskAsync,
    deleteTaskAsync,
    updateTaskAsync
} from "../../bus/tasks/actions";

// Components
import Checkbox from "../../theme/assets/Checkbox";
import Task from "../Task";
import Spinner from "../Spinner";

const mapStateToProps = (state) => ({
    fetching: state.getIn(["ui", "isFetching"]),
    tasks:    sortTasksByGroup(state),
});

const mapDispatchToProps = {
    fetchTasksAsync,
    createTaskAsync,
    deleteTaskAsync,
    updateTaskAsync,
};

@connect(
    mapStateToProps,
    mapDispatchToProps
)
export default class Scheduler extends Component {
    static propTypes = {
        createTaskAsync: PropTypes.func.isRequired,
        deleteTaskAsync: PropTypes.func.isRequired,
        fetching:        PropTypes.bool.isRequired,
        fetchTasksAsync: PropTypes.func.isRequired,
        tasks:           PropTypes.arrayOf(PropTypes.object).isRequired,
        updateTaskAsync: PropTypes.func.isRequired,
    };

    state = {
        newTaskMessage: "",
        tasksFilter:    "",
    };

    componentDidMount () {
        this.props.fetchTasksAsync();
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
        const { newTaskMessage: message } = this.state;

        if (!message.length) {
            return;
        }

        this.props.createTaskAsync({ message });
        this.setState({ newTaskMessage: "" });
    };

    _saveEditTask = (id) => (message) => {
        const { tasks } = this.props;
        const task = tasks.get(id);

        const updatedTask = task.update("message", () => message);

        this.props.updateTaskAsync(List([updatedTask]));
    };

    _deleteTask = (index) => () => {
        const { tasks } = this.props;
        const id = tasks.getIn([index, "id"]);

        this.props.deleteTaskAsync(id);
    };

    _toggleTaskField = (id) => (field) => () => {
        const { tasks, updateTaskAsync: _updateTaskAsync } = this.props;
        const task = tasks.get(id);

        const updatedTask = task.update(field, (value) => !value);

        _updateTaskAsync(List([updatedTask]));
    };

    _completeAllTasks = () => {
        const { tasks, updateTaskAsync: _updateTaskAsync } = this.props;
        const updatedTasks = tasks
            .filter((item) => !item.get("completed"))
            .map((item) => {
                return item.update("completed", () => true);
            });

        _updateTaskAsync(updatedTasks);
    };

    render () {
        const { tasksFilter, newTaskMessage } = this.state;
        const { fetching, tasks } = this.props;

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
                                    task
                                        .get("message")
                                        .toLowerCase()
                                        .includes(tasksFilter.toLowerCase())
                                )
                                .map((task, id) => (
                                    <Task
                                        completed = { task.get("completed") }
                                        favorite = { task.get("favorite") }
                                        id = { task.get("id") }
                                        key = { task.get("id") }
                                        message = { task.get("message") }
                                        onCheckedHandler = { this._toggleTaskField(
                                            id
                                        ) }
                                        onDeleteHandler = { this._deleteTask(id) }
                                        onSaveHandler = { this._saveEditTask(id) }
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
