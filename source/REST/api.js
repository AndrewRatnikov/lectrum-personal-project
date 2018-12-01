import { MAIN_URL, TOKEN } from "./config";

const headers = {
    Authorization:  TOKEN,
    "Content-Type": "application/json",
};

export const api = Object.freeze({
    async fetchTasks () {
        const response = await fetch(MAIN_URL, {
            method: "GET",
            headers,
        });

        if (response.status !== 200) {
            throw new Error("Error: fetch tasks failed");
        }
        const { data } = await response.json();

        console.log(data);

        return data;
    },
    async createTask (data) {
        const response = await fetch(MAIN_URL, {
            method: "POST",
            headers,
            data,
        });

        if (response.status !== 200) {
            throw new Error("Error: create task failed");
        }
        const { data } = await response.json();

        console.log(data);

        return data;
    },
    async updateTask (data) {
        const response = await fetch(MAIN_URL, {
            method: "POST",
            headers,
            data,
        });

        if (response.status !== 200) {
            throw new Error("Error: update task failed");
        }
        const { data } = await response.json();

        console.log(data);

        return data;
    },
    async deleteTask (data) {
        const response = await fetch(MAIN_URL, {
            method: "POST",
            headers,
            data,
        });

        if (response.status !== 200) {
            throw new Error("Error: create task failed");
        }

        console.log(response);
    },
});
