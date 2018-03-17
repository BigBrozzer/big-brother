import React from 'react';

let recording = false;

const initialJourneyInfo = {
    initialState: null,
    actions: [],
};
const journeyInfo = {};
const api = {
    getRecord: console.log,
    sendRecord: console.log,
};
let reducer = console.log;
let appStore = null;

export const startRecording = () => {
    journeyInfo.initialState = appStore.getState();

    recording = true;
};

export const stopRecording = () => {
    recording = false;
};

export const sendRecords = () => api.sendRecord(journeyInfo);

export const resetRecorder = () => {
    Object.assign(journeyInfo, initialJourneyInfo);
};

export const startPlaying = (id) => api.getRecord(id)
    .then(({initialState, actions}) => {
        console.log('Received data', initialState, actions);

        appStore.dispatch({
            type: 'JOURNEY_REPRODUCING',
            initialState
        });

        actions.forEach((action, index) => {
            setTimeout(() => appStore.dispatch(action), index*1000);
        });
    });

const journeyMiddleWare = store => {
    appStore = store;

    return next => action => {
        if (recording) {
            journeyInfo.actions.push(action);
        }
        next(action);
    }
};

const journeyConnector = (rootReducer, apiProvider) => {
    Object.assign(api, apiProvider);
    reducer = rootReducer;

    return journeyMiddleWare;
};

resetRecorder();

export default journeyConnector;
