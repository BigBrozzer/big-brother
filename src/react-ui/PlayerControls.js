import React, { Component } from 'react';

import closeImg from '../assets/close.png';
import pauseImg from '../assets/pause.png';
import nextActionImg from '../assets/next action.png';
import prevActionImg from '../assets/prev action.png';
import playImg from '../assets/play.png';
import replayImg from '../assets/replay.png';
import shareImg from '../assets/share.png';

import './PlayerControls.css';

export class PlayerControls extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <aside className="player-controls">
                <div className="player-controls__main">
                    <button className="player-controls__btn">
                        <img className="player-controls__img" src={pauseImg} alt=""/>
                    </button>
                    <button className="player-controls__btn">
                        <img className="player-controls__img" src={replayImg} alt=""/>
                    </button>
                    <button className="player-controls__btn">
                        <img className="player-controls__img" src={prevActionImg} alt=""/>
                    </button>
                    <button className="player-controls__btn">
                        <img className="player-controls__img" src={nextActionImg} alt=""/>
                    </button>
                </div>

                <div className="player-controls__secondary">
                    <button className="player-controls__btn">
                        <img className="player-controls__img" src={shareImg} alt=""/>
                    </button>
                    <button className="player-controls__btn">
                        <img className="player-controls__img" src={closeImg} alt=""/>
                    </button>
                </div>
            </aside>
        );
    }
}

export default PlayerControls;
