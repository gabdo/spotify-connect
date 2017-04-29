import React, { Component } from 'react';
import { browserHistory } from 'react-router';

export default class Login extends Component {
    handleClick(e) {
        this.login(function (accessToken) {
            browserHistory.push('/player/' + accessToken);
        });
    }

    render() {
        return (
            <div className="login panel panel-default">
                <div className="panel-body">
                    <img src="assets/reactifytransparent.png" />
                    <h2>
                    Listen your Spotify Music in the best React App
                    </h2>
                    <br /><br />
                    <a href="javascript:void(0)" onClick={(e) => this.handleClick(e)} className="btn btn-raised btn-default">Log in with Spotify</a>
                </div>
            </div>
        );
    }

    login(callback) {
        var CLIENT_ID = 'a3c897b5b59d4da693b2adbb10c764a4';
        var REDIRECT_URI = 'http://localhost:7777/callback/';
        function getLoginURL(scopes) {
            return 'https://accounts.spotify.com/authorize?client_id=' + CLIENT_ID +
                '&redirect_uri=' + encodeURIComponent(REDIRECT_URI) +
                '&scope=' + encodeURIComponent(scopes.join(' ')) +
                '&response_type=token';
        }

        var url = getLoginURL([
            'user-read-email'
        ]);

        var width = 450,
            height = 630,
            left = (screen.width / 2) - (width / 2),
            top = (screen.height / 2) - (height / 2);

        window.addEventListener("message", function (event) {
            var hash = JSON.parse(event.data);
            if (hash.type == 'access_token') {
                callback(hash.access_token);
            }
        }, false);

        var w = window.open(url,
            'Spotify',
            'menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left
        );
    }
}