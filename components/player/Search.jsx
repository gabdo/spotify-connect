import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
import Spotify from 'spotify-web-api-js';
import SearchResult from './SearchResult.jsx'
const spotifyApi = new Spotify();

var prev = null;

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userInput: '', trackList: "" }
  }

  render() {
    return (
      <div className="text-center">
        <h1 className="title-big">Listen your music or <a href="#">discovery new </a></h1>
        <input type="text" name="search" onChange={(e) => this.handleUserInput(e)} value={this.state.userInput} placeholder="Search Artist.." />
        <h1>{this.state.userInput}</h1>
        <SearchResult trackList={this.state.trackList} />
      </div>
    )
  }

  handleUserInput(e) {
    var queryTerm = e.target.value;

    this.setState({
      userInput: e.target.value
    });

    spotifyApi.searchTracks(queryTerm)
      .then(data => {
        this.setState({
          trackList: data
        });
      }, (err => {
        this.setState({
          trackList: ""
        });
      }));

  }
}
export default Search;