import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
import Sidebar from './player/Sidebar.jsx';

class Creditos extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="login panel panel-default ">
        <div className="panel-body ">
          <h1>Creditos</h1>
          <table className="table table-striped table-hover ">
            <thead>
            <tr>
              <th>Api</th>
              <th>Link</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>Login with Spotify</td>
              <td> <a href="http://jsfiddle.net/JMPerez/62wafrm7/" target="_blank">http://jsfiddle.net/JMPerez/62wafrm7/</a></td>
            </tr>
             <tr>
              <td>Spotify API </td>
              <td> <a href="https://github.com/JMPerez/spotify-web-api-js" target="_blank">Spotify Web API JS</a></td>
            </tr>
            <tr>
              <td>CSS </td>
              <td> <a href="http://fezvrasta.github.io/bootstrap-material-design/bootstrap-elements.html" target="_blank"> Material Design for Bootstrap   </a></td>
            </tr>
            </tbody>
          </table>
        
        </div>
      </div>
    );
  }


}
export default Creditos;
