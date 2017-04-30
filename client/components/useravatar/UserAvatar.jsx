import React from 'react';

function UserAvatar({ email = '', country = '', external_urls, followers, id, display_name, images }) {

  const style = {
    welcome: {
      fontWeight: 'bold',
      marginBottom: 28,
      fontSize: 16,
    },
    list: {
      padding: 0,
    },
    listItem: {
      listStyle: 'none',
    },
    img: {
      width: 64,
      height: 64,
      borderRadius: '100%',
      marginBottom: 24,
    }
  };

  let urls = [];
  for (const service in external_urls) {
    urls.push(`${service}: ${external_urls[service]}`);
  }
  urls = urls.join(', ');

  return (<section>
    <div className="username" style={style.welcome}>Welcome {(display_name) ? display_name : email}</div>
    {(images.length) ? <img style={style.img} src={images[0].url} alt=""/> : <div></div>}
    <p>The following information is associated with your account:</p>
    <ul style={style.list}>
      <li style={style.listItem}>ID: {id}</li>
      <li style={style.listItem}>Country: {country}</li>
      <li style={style.listItem}>Followers: {(typeof followers !== 'undefined' && typeof followers['total'] !== 'undefined') ? followers.total:''}</li>
      <li style={style.listItem}>{urls}</li>
    </ul>
  </section>);
}

UserAvatar.propTypes = {
  email: React.PropTypes.string,
}

export default UserAvatar;
