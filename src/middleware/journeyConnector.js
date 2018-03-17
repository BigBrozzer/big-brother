import React from 'react';
import { userActionTypes } from './userActionTypes.constant';
import {createMarkHtmlElementOnThePage} from "../react-ui/utils/markElementCreator";

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
    recording = true;
};

export const stopRecording = () => {
    recording = false;
};

export const pushUserAction = (userAction) => {
    journeyInfo.actions.push(userAction);
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
            setTimeout(() => {
                if (action.type === userActionTypes.storeAction) {
                    appStore.dispatch(action.action);
                }

                if (action.type === userActionTypes.clickAction) {
                    createMarkHtmlElementOnThePage(action.action);
                }
            }, index*1000);
        });
    });

const journeyMiddleWare = store => {
    appStore = store;

    return next => action => {
        console.log('Middleware triggered:', action);
        if (recording) {
            if (journeyInfo.initialState === null) {
                journeyInfo.initialState = store.getState();
                console.log('Store defined:', action);
            }
            pushUserAction({ type: userActionTypes.storeAction, action});
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
