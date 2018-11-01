// Core
import React, { Component } from "react";

// Instruments
import Styles from "./styles.m.css";
import { api } from "../../REST"; // ! Импорт модуля API должен иметь именно такой вид (import { api } from '../../REST')

export default class Scheduler extends Component {
    render () {
        return (
            <section className = { Styles.scheduler }>
                <main>
                    <header>
                        <h1>Task Manager</h1>
                        <input placeholder = 'Search' type = 'search' />
                    </header>
                    <section>
                        <form>
                            <input placeholder = 'Type new task' type = 'text' />
                            <button>Add task</button>
                        </form>
                    </section>
                </main>
            </section>
        );
    }
}
