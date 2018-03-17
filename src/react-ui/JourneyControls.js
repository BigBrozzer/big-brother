import React, { Component, PropTypes } from 'react';
import Player from './Player';
import Recorder from './Recorder';

export const JourneyControls = props => (
    props.playing ? <span>Reproduced</span> : (
        <div>
            {!props.recording &&  <Player {...props} />}
            <Recorder {...props} />
            <button onClick={props.handleHide}>Hide controls</button>
        </div>
    )
);

JourneyControls.propTypes = {
    handleHide: PropTypes.func.isRequired
};

export default JourneyControls;

