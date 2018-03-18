import React from 'react';

let recording = false;

const initialJourneyInfo = {
    initialState: null,
    actions: [],
    userActions_rn: [],
    userActions_web: [],
};
const journeyInfo = {};
const api = {
    getRecord: console.log,
    sendRecord: console.log,
};
let reducer = console.log;
let appStore = null;

export const saveRNUserActions = actions => {
  journeyInfo.userActions_rn = actions;
};

export const saveWebUserActions = actions => {
  journeyInfo.userActions_web = actions;
};

export const startRecording = () => {
    journeyInfo.initialState = appStore.getState();
    journeyInfo.startTime = (new Date).getTime();

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
    .then(response => {
      const {
        initialState,
        startTime,
        actions,
        userActions_rn,
        userActions_web,
      } = response;
        console.log('Received data', response);

        appStore.dispatch({
            type: 'JOURNEY_REPRODUCING',
            initialState
        });

        actions.forEach((action) => {
            setTimeout(() => appStore.dispatch(action), action.timestamp - startTime);
        });
        return response;
    });

export const journeyMiddleWare = store => next => action => {
    if (recording) {
        journeyInfo.actions.push({...action, timestamp: (new Date()).getTime() });
    }
    next(action);
};

const journeyConnector = (store, rootReducer, apiProvider) => {
    Object.assign(api, apiProvider);
    reducer = rootReducer;
    appStore = store;
    try {
        const predefinedIdPair = window && window.location.search.replace('?', '').split('&').find(param => param.includes('bb-id'));
        const predefinedId = predefinedIdPair && predefinedIdPair.split('=')[1];
        if (predefinedId) {
            setTimeout(() => startPlaying(predefinedId), 1000);
        }
    } catch (e) {
        console.log('Predefined id error', e);
    }
};

resetRecorder();

export default journeyConnector;
