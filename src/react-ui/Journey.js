import React, { Component } from 'react';
import { startRecording, stopRecording, sendRecords, startPlaying, pushUserAction } from '../middleware/journeyConnector';
import JourneyControls from './JourneyControls';
import RecordButton from './RecordButton';
import {userActionTypes} from "../middleware/userActionTypes.constant";
import {createUserAction} from "../middleware/bigBrotherActionFactory";

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

        /* Record click and scroll actions */
    }

    componentDidMount() {
        const applicationRootElement = document.querySelector('#root');
        if (applicationRootElement) {
            applicationRootElement.addEventListener('click', this.onDocumentClickEvent);
        }
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.onDocumentClickEvent);
    }

    onDocumentClickEvent(event) {
        const timeStamp = (new Date()).getTime();
        const clickAction = { pageY: event.pageY, pageX: event.pageX };
        const userAction = createUserAction(clickAction, userActionTypes.clickAction, timeStamp);

        pushUserAction(userAction);
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
        if (this.state.isShowed) {
            return (<div style={{width: '100%', height: '100%', border: '1px solid green'}}>
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
            </div>);
        } else {
            return <RecordButton handleClick={this.show}></RecordButton>
        }
    }
}

export default Journey;
