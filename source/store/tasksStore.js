// Core
import { observable, action } from "mobx";

// Instruments
import { api } from "../REST";

class Tasks {
    @observable fetching = false;
    @observable tasks = [];

    startFetching () {
        this.fetching = true;
    }
    stopFetching () {
        this.fetching = false;
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
