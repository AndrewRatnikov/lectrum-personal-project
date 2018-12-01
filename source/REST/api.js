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

        return data;
    },
    async createTask (data) {
        const response = await fetch(MAIN_URL, {
            method: "POST",
            headers,
            body:   JSON.stringify(data),
        });

        if (response.status !== 200) {
            throw new Error("Error: create task failed");
        }
        const { data: result } = await response.json();

        return result;
    },
    async updateTask (data) {
        const response = await fetch(MAIN_URL, {
            method: "PUT",
            headers,
            body:   JSON.stringify(data),
        });

        if (response.status !== 200) {
            throw new Error("Error: update task failed");
        }
        const { data: result } = await response.json();

        return result;
    },
    async deleteTask (id) {
        const response = await fetch(`${MAIN_URL}/${id}`, {
            method: "DELETE",
            headers,
        });

        if (response.status !== 204) {
            throw new Error("Error: delete task failed");
        }
    },
});
