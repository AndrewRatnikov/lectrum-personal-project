// Core
import moment from 'moment';
import { v4 } from 'uuid';

export function getDisplayName (WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export const sortTasksByDate = (tasks) => {
    return tasks.sort((task1, task2) => {
        if (
            moment(task1.get('created')).unix()
            < moment(task2.get('created')).unix()
        ) {
            return 1;
        } else if (
            moment(task1.get('created')).unix()
            > moment(task2.get('created')).unix()
        ) {
            return -1;
        }

        return 0;
    });
};

export const sortTasksByGroup = (state) => {
    const tasks = state.get('tasks');

    const favorite = tasks.filter(
        (task) => task.get('favorite') && !task.get('completed')
    );
    const usual = tasks.filter(
        (task) => !task.get('favorite') && !task.get('completed')
    );
    const completed = sortTasksByDate(
        tasks.filter((task) => task.get('completed'))
    );

    const sortedCompleted = completed.sort((task1, task2) => {
        if (task1.get('favorite') && !task2.get('favorite')) {
            return -1;
        } else if (!task1.get('favorite') && task2.get('favorite')) {
            return 1;
        }

        return 0;
    });

    const result = sortTasksByDate(favorite).concat(
        sortTasksByDate(usual),
        sortedCompleted
    );

    return result;
};

export class BaseTaskModel {
    constructor (
        id = v4(),
        completed = false,
        favorite = false,
        message = 'Выполнить важную задачу (создано в конструкторе).'
    ) {
        this.id = id;
        this.completed = completed;
        this.favorite = favorite;
        this.message = message;
    }
}

export const checkLengthHigherFifty = (value) => value.length > 50;
