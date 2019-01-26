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
}

export default new Tasks();
