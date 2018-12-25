// Core
import React, { Component } from 'react';
import FlipMove from 'react-flip-move';
import { connect } from 'react-redux';

// Instruments
import Styles from './styles.m.css';
import { api } from '../../REST'; // ! Импорт модуля API должен иметь именно такой вид (import { api } from '../../REST')
import { sortTasksByGroup, checkLengthHigherFifty } from '../../instruments';
import {
    fetchTasksAsync,
    createTaskAsync,
    deleteTaskAsync
} from '../../bus/tasks/actions';

// Components
import Checkbox from '../../theme/assets/Checkbox';
import Task from '../Task';
import Spinner from '../Spinner';

const mapStateToProps = (state) => ({
    fetching: state.ui.isFetching,
    tasks:    sortTasksByGroup(state.tasks),
});

const mapDispatchToProps = {
    fetchTasksAsync,
    createTaskAsync,
    deleteTaskAsync,
};

@connect(
    mapStateToProps,
    mapDispatchToProps
)
export default class Scheduler extends Component {
    state = {
        newTaskMessage: '',
        tasksFilter:    '',
        tasks:          [],
    };

    componentDidMount () {
        this.props.fetchTasksAsync();
        // this._fetchTasksAsync();
    }

    _toggleSpinner = (show) => this.setState({ fetching: show });

    // _fetchTasksAsync = async () => {
    //     try {
    //         this._toggleSpinner(true);
    //         const tasks = await api.fetchTasks();

    //         this.setState({ tasks: sortTasksByGroup(tasks) });
    //     } finally {
    //         this._toggleSpinner(false);
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
        const { newTaskMessage: message } = this.state;

        if (!message.length) {
            return;
        }

        // this._createTaskAsync();
        this.props.createTaskAsync({ message });
        this.setState({ newTaskMessage: '' });
    };

    // _createTaskAsync = async () => {
    //     try {
    //         this._toggleSpinner(true);
    //         const { newTaskMessage: message } = this.state;
    //         const task = await api.createTask({ message });

    //         this.setState((prevState) => {
    //             const tasks = [ task, ...prevState.tasks ];

    //             return { tasks: sortTasksByGroup(tasks), newTaskMessage: '' };
    //         });
    //     } finally {
    //         this._toggleSpinner(false);
    //     }
    // };

    _saveEditTask = (id) => (message) => {
        const { tasks } = this.state;
        const task = { ...tasks[ id ] };

        task.message = message;

        this._updateTaskAsync(id, [ task ]);
    };

    _updateTaskAsync = async (id, tasks) => {
        try {
            this._toggleSpinner(true);
            const changedTasks = await api.updateTask(tasks);

            if (Number.isInteger(id)) {
                this._updateOneTask(id, changedTasks);
            } else {
                this._updateAllTask(changedTasks);
            }
        } finally {
            this._toggleSpinner(false);
        }
    };

    _updateOneTask = (id, tasks) => {
        this.setState((prevState) => {
            const updatedTasks = [ ...prevState.tasks ];

            updatedTasks[ id ] = tasks[ 0 ];

            return { tasks: sortTasksByGroup(updatedTasks) };
        });
    };

    _updateAllTask = (tasks) => {
        this.setState({ tasks: sortTasksByGroup(tasks) });
    };

    _deleteTask = (id) => () => {
        // this._deleteTaskAsync(id);
        const { tasks } = this.props;

        this.props.deleteTaskAsync(tasks[ id ].id);
    };

    // _deleteTaskAsync = async (id) => {
    //     try {
    //         this._toggleSpinner(true);
    //         const { tasks } = this.state;

    //         await api.deleteTask(tasks[ id ].id);
    //         this.setState((prevState) => {
    //             const newTasks = [ ...prevState.tasks ];

    //             newTasks.splice(id, 1);

    //             return { tasks: newTasks };
    //         });
    //     } finally {
    //         this._toggleSpinner(false);
    //     }
    // };

    _toggleTaskField = (id) => (field) => () => {
        const task = { ...this.state.tasks[ id ] };

        task[ field ] = !this.state.tasks[ id ][ field ];
        this._updateTaskAsync(id, [ task ]);
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
                                .filter((task) => task.message
                                    .toLowerCase()
                                    .includes(tasksFilter.toLowerCase()))
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
