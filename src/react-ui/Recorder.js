import React  from 'react';

export const Recorder = ({
     stopRecording,
     startRecording,
     recording,
     recordId
 }) => (
    recordId ? <span>{recordId}</span> : (recording
        ? <button onClick={stopRecording}>Stop</button>
        : <button onClick={startRecording}>Start</button>)
);

export default Recorder;
