import React, { Component } from 'react';
import { startRecording, stopRecording, sendRecords, startPlaying } from '../middleware/journeyConnector';
import JourneyControls from './JourneyControls';
import PlayerControls from './PlayerControls';

import './Journey.css';

class Journey extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isShowed: false,
            recording: false,
            playing: false,
            sending: false,
            recordId: '',
        };

        this.startRecording = this.startRecording.bind(this);
        this.stopRecording = this.stopRecording.bind(this);
        this.startPlaying = this.startPlaying.bind(this);
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
    }

    startRecording() {
        startRecording();
        this.setState({ recording: true });
    }

    stopRecording() {
        stopRecording();
        this.setState({ recording: false, sending: true });

        sendRecords()
            .then((recordId) => {
                console.log('recordId', recordId);
                this.setState({ recordId, sending: false });
            });
    }

    startPlaying(id) {
        this.setState({ sending: true });

        startPlaying(id)
            .then(() => this.setState({ playing: true, sending: false }));
    }

    show() {
        this.setState({ isShowed: true });
    }

    hide() {
        this.setState({ isShowed: false });
    }

    render() {
        return (<div className={this.state.recording ? `controls controls_recording` : `controls`}>
            { this.state.sending
                ? <span>Spinner</span>
                : <JourneyControls
                    {...this.state}
                    startRecording={this.startRecording}
                    stopRecording={this.stopRecording}
                    startPlaying={this.startPlaying}
                    handleHide={this.hide}
                />
            }
            {this.state.recording && <div className="controls__frame"></div>}
            {this.state.playing && <PlayerControls />}
        </div>);
    }
}

export default Journey;
