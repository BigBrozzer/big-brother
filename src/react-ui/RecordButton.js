import React, { Component, PropTypes } from 'react';

const RecordButton = ({handleClick}) => (
    <div style={{
        position: 'fixed',
        top: '0',
        right: '0',
        width: '20px',
        height: '20px',
        padding: '2px',
        border: '1px solid white',
        opacity: '50%'
    }}>
        <button style={{margin: '0', padding: '0', border: 'none'}} onClick={handleClick}>
            🔴
        </button>
    </div>
);

RecordButton.propTypes = {
    handleClick: PropTypes.func.isRequired
};

export default RecordButton;
