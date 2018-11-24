// Core
import React, { PureComponent } from "react";
import PropTypes from "prop-types";

// Instruments
import Styles from "./styles.m.css";

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
    };

    constructor (props) {
        super(props);
        this.state = {
            ...this._getTaskShape(props),
            disabled: true,
        };
    }

    _toggleEditCreatedTask = () =>
        this.setState((prevState) => ({ disabled: !prevState.disabled }));

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
        const { completed, favorite, disabled } = this.state;

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
                        disabled = { disabled }
                        type = 'text'
                        value = { this.state.message }
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
