import React from 'react';
import debounce from 'lodash/debounce';

class SearchBox extends React.Component {

  constructor() {
    super();

    this.state = {
      search: '',
    };

    this.handleChange = debounce(this.handleChange, 500);

  }

  handleChange (event) {
    this.setState({ search: this.inputSearch.value });
    this.props.onSearch(this.state.search);
  }

  render() {
    return(<div style={{ paddingLeft: 30, marginBottom: 30 }}>
      <input ref={(thisInput) => {this.inputSearch = thisInput;}} placeholder="Search albums, playlist..." onChange={this.handleChange.bind(this)} type="text"/>
    </div>);
  }
}

export default SearchBox;
