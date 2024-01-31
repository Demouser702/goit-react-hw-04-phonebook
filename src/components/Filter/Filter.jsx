import React, { Component } from 'react';

export default class Filter extends Component {
  state = {
    filter: '',
  };
  handleChange = evt => {
    const { value } = evt.target;
    this.setState({ filter: value });
    this.props.onChange(value);
  };

  render() {
    const { filter } = this.state;
    return (
      <form className="form">
        <label>
          <span>Find contacts by name</span>
          <input
            className="form-input "
            value={filter}
            name="filter"
            type="text"
            placeholder=""
            onChange={this.handleChange}
          />
        </label>
      </form>
    );
  }
}
