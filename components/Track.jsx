import React, { Component, PropTypes } from 'react'

var audioObject = "";
var idTrack = "";
var isPaused = false;

export default class Track extends Component {
    constructor(props) {
        super(props);
        this.state = { iconclass: 'play_arrow' }
    }

    componentWillUnmount() {
        if (audioObject) {
            this.pauseAudio();
        }
    }

    render() {
        return (
            <div className="list-group-item">
                <div className="row-action-primary" onClick={(e) => this.playTrack(e)}>
                    <i className="material-icons">{this.state.iconclass}</i>
                </div>
                <div className="row-content">
                    <div className="least-content">{(this.props.track.duration_ms / 60000).toFixed(2)}</div>
                    <h4 className="list-group-item-heading"> {this.props.track.name}</h4>
                    <p className="list-group-item-text"><strong>{this.props.track.album.artists[0].name}</strong> Album: {this.props.track.album.name}</p>
                </div>
            </div>
        )
    }

    playTrack() {
        if (audioObject && isPaused == false) {
            if (idTrack != this.props.track.id) {
                this.pauseAudio();
                this.playAudio();
            } else {
                this.pauseAudio();

            }
        } else {
            this.playAudio();
        }
    }

    playAudio() {
        idTrack = this.props.track.id;
        audioObject = new Audio(this.props.track.preview_url);
        audioObject.play();
        isPaused = false;
        this.setState({ "iconclass": 'graphic_eq' });
    }

    pauseAudio() {
        audioObject.pause();
        isPaused = true;
        this.setState({ "iconclass": 'play_arrow' });
    }

}