import React, { Component } from 'react';
import Player from './Player';
import Recorder from './Recorder';

export const JourneyControls = props => (
    props.playing ? <span>Reproduced</span> : (
        <div>
            {!props.recording &&  <Player {...props} />}
            <Recorder {...props} />
        </div>
    )
);

export default JourneyControls;

