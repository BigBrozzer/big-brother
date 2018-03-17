import React, { Component } from 'react';

export class Player extends Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
    }

    submit() {
        this.props.startPlaying(this.idInput.value);
    }

    render() {
        return (
            <form onSubmit={this.submit}>
                <input
                    type="text"
                    ref={(input) => { this.idInput = input; }}
                />
                <button type="submit">Fetch</button>
            </form>
        )
    }
}

export default Player;
