// Core
import React, { PureComponent } from "react";

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

    constructor (props) {
        super(props);
        this.state = this._getTaskShape(props);
    }

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
        const { onCheckedHandler } = this.props;
        const { completed, favorite } = this.state;

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
                    <input disabled type = 'text' value = { this.state.message } />
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
                    />
                    <Remove inlineBlock color1 = '#3b8ef3' color2 = '#000' />
                </div>
            </li>
        );
    }
}
