import React, { Component, PropTypes } from 'react'

export default class Sidebar extends Component {

    render() {

        const {country, display_name, email, external_urls, followers, href, id, images, product, type, uri } = this.props.userInfo;
        const imageUrl = images[0] ? images[0].url : "";

        return (
            <div className='col-sm-2 sidebar'>
                <div className='title'>
                    <img src="../assets/reactifysolologotrans.png" width="50px" /> REACTIFY
                </div>
                <div className="text-center">
                    <img className="avatar" src={imageUrl} />

                    <h3>Bienvenido(a) {display_name}</h3>
                    <h4>Id {id}</h4>
                    <h4>Email {email}</h4>
                </div>
                <br/><br/>
                <ul className='nav nav-pills nav-stacked'>
                   
                    <li>
                        <a href="/creditos">Creditos</a>
                    </li>
                    <li>
                        <a href="/login">Login</a>
                    </li>
                </ul>
            </div>
        )
    }

}