// Core
import { observable, action, computed } from "mobx";

// Instruments
import { api } from "../REST";
import { sortTasksByGroup } from "../instruments/helpers";

class Tasks {
    @observable fetching = false;
    @observable tasks = [];

    startFetching () {
        this.fetching = true;
    }
    stopFetching () {
        this.fetching = false;
    }

    @computed
    get sortedTasks () {
        return sortTasksByGroup(this.tasks);
    }

    @action
    async fetchTasks () {
        try {
            this.startFetching();
            const tasks = await api.fetchTasks();

            this.tasks = tasks;
        } finally {
            this.stopFetching();
        }
    }

    @action
    async createTask (message) {
        try {
            this.startFetching();
            const task = await api.createTask({ message });

            this.tasks.push(task);
        } finally {
            this.stopFetching();
        }
    }

    @action
    async deleteTask (task) {
        try {
            this.startFetching();
            await api.deleteTask(task.id);

            this.tasks.remove(task);
        } finally {
            this.stopFetching();
        }
    }

    @action
    async updateTask (tasks) {
        try {
            this.startFetching();
            const changedTasks = await api.updateTask(tasks);

            if (changedTasks.length === 1) {
                const taskId = changedTasks[0].id;

                this.tasks = this.tasks.map(
                    (item) => item.id === taskId ? changedTasks[0] : item
                );
            } else {
                this.tasks.replace(changedTasks);
            }
        } finally {
            this.stopFetching();
        }
    }
}

export default new Tasks();
