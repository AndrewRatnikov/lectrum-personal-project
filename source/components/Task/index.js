// Core
import React, { PureComponent } from "react";
import PropTypes from "prop-types";

// Instruments
import Styles from "./styles.m.css";
import { checkLengthHigherFifty } from "../../instruments/helpers";

// Components
import Checkbox from "../../theme/assets/Checkbox";
import Remove from "../../theme/assets/Remove";
import Edit from "../../theme/assets/Edit";
import Star from "../../theme/assets/Star";

export default class Task extends PureComponent {
    static getDerivedStateFromProps (props) {
        const { completed, favorite } = props;

        return {
            completed,
            favorite,
        };
    }

    static propTypes = {
        completed:        PropTypes.bool.isRequired,
        favorite:         PropTypes.bool.isRequired,
        id:               PropTypes.string.isRequired,
        message:          PropTypes.string.isRequired,
        onCheckedHandler: PropTypes.func.isRequired,
        onDeleteHandler:  PropTypes.func.isRequired,
        onSaveHandler:    PropTypes.func.isRequired,
    };

    constructor (props) {
        super(props);
        this.state = {
            ...this._getTaskShape(props),
            editing: false,
        };
    }

    _editTaskHandler = (event) => {
        const { value } = event.target;

        if (checkLengthHigherFifty(value)) {
            return;
        }

        this.setState({ message: value });
    };

    _toggleEditCreatedTask = () => {
        this.setState((prevState) => {
            const message = prevState.message.length
                ? prevState.message
                : this.props.message;

            return {
                editing: !prevState.editing,
                message,
            };
        });
    };

    _updateTaskHandler = (event) => {
        const { message } = this.state;

        if (!message.length) {
            return;
        }

        switch (event.key) {
            case "Enter":
                this._updateTask();
                break;
            case "Escape":
                this._cancelEditingTask();
                break;
            default:
                break;
        }
    };

    _updateTask = () => {
        this.props.onSaveHandler(this.state.message);
        this.setState({
            editing: false,
        });
    };

    _cancelEditingTask = () => {
        this.setState({
            editing: false,
            message: this.props.message,
        });
    };

    _getTaskShape = ({
        id = this.props.id,
        completed = this.props.completed,
        favorite = this.props.favorite,
        message = this.props.message,
    }) => ({
        id,
        completed,
        favorite,
        message,
    });

    render () {
        const { onCheckedHandler, onDeleteHandler } = this.props;
        const { completed, favorite, editing } = this.state;

        return (
            <li className = { Styles.task }>
                <div className = { Styles.content }>
                    <Checkbox
                        checked = { completed }
                        className = { Styles.toggleTaskCompletedState }
                        color1 = '#3b8ef3'
                        color2 = '#fff'
                        onClick = { onCheckedHandler("completed") }
                    />
                    <input
                        disabled = { !editing }
                        type = 'text'
                        value = { this.state.message }
                        onChange = { this._editTaskHandler }
                        onKeyDown = { this._updateTaskHandler }
                    />
                </div>
                <div className = { Styles.actions }>
                    <Star
                        inlineBlock
                        checked = { favorite }
                        className = { Styles.toggleTaskFavoriteState }
                        color1 = '#3b8ef3'
                        color2 = '#000'
                        onClick = { onCheckedHandler("favorite") }
                    />
                    <Edit
                        inlineBlock
                        className = { Styles.updateTaskMessageOnClick }
                        color1 = '#3b8ef3'
                        color2 = '#000'
                        onClick = { this._toggleEditCreatedTask }
                    />
                    <Remove
                        inlineBlock
                        color1 = '#3b8ef3'
                        color2 = '#000'
                        onClick = { onDeleteHandler }
                    />
                </div>
            </li>
        );
    }
}
