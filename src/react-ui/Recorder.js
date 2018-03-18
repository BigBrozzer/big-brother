import React  from 'react';
import './Recorder.css';

const getUrl = (id) => {
    const href = window.location.href;
    const separator = href.includes('?') ? '&' : '?';

    return `${href}${separator}bb-id=${id}`;
};

export const Recorder = ({
     stopRecording,
     startRecording,
     recording,
     recordId
 }) => (
    recordId ? (
        <div style={{display: 'inline-block'}}>
            <span style={{display: 'inline-block', 'padding-right': '10px'}}>Clipboard: {recordId}</span>
            <a href={getUrl(recordId)}>Link for reproducing</a>
        </div>
    ) : (recording
        ? <button className="recorder-btn" onClick={stopRecording}>	&#9632;</button>
        : <span >
             <button className="recorder-btn recorder-btn_record" onClick={startRecording}>&#9679;</button>
             <span className="record-title">NEW_RECORD_1</span>
          </span>)
);

export default Recorder;
