import React, { Component } from 'react';
import { startRecording, stopRecording, sendRecords, startPlaying } from '../middleware/journeyConnector';
import JourneyControls from './JourneyControls';

export class Journey extends Component {
    constructor(props) {
        super(props);

        this.state = {
            recording: false,
            playing: false,
            sending: false,
            recordId: '',
        };

        this.startRecording = this.startRecording.bind(this);
        this.stopRecording = this.stopRecording.bind(this);
        this.startPlaying = this.startPlaying.bind(this);
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

    render() {
        return (
            <div style={{position: 'fixed', top: '10px', right: '10px' }}>
                { this.state.sending
                    ? <span>Spinner</span>
                    : <JourneyControls
                        {...this.state}
                        startRecording={this.startRecording}
                        stopRecording={this.stopRecording}
                        startPlaying={this.startPlaying}
                    />
                }
            </div>
        );
    }
}

export default Journey;
