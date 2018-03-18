import React  from 'react';
import './Recorder.css';


export const Recorder = ({
     stopRecording,
     startRecording,
     recording,
     recordId
 }) => (
    recordId ? <span>{recordId}</span> : (recording
        ? <button className="recorder-btn" onClick={stopRecording}>	&#9632;</button>
        : <span >
             <button className="recorder-btn recorder-btn_record" onClick={startRecording}>&#9679;</button>
             <span className="record-title">NEW_RECORD_1</span>
          </span>)
);

export default Recorder;
