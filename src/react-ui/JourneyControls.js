import React, { Component, PropTypes } from 'react';
import Player from './Player';
import Recorder from './Recorder';

export const JourneyControls = props => (
    props.playing ? <span>Reproduced</span> : (
        <div>
            <Recorder {...props} />
            {!props.recording &&  <Player {...props} />}
        </div>
    )
);

JourneyControls.propTypes = {
    handleHide: PropTypes.func.isRequired
};

export default JourneyControls;

