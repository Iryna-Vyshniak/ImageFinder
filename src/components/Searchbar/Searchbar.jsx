import React, { Component } from 'react';
import {
  Header,
  SearchForm,
  SearchFormBtn,
  SearchFormInput,
} from './Searchbar.styled';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { toast } from 'react-toastify';
import { notifyOptions } from '../notify/notify';
import PropTypes from 'prop-types';

export class Searchbar extends Component {
  state = {
    value: '',
  };

  handleChange = ({ target: { value } }) => {
    this.setState({ value: value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.value.trim() === '') {
      return toast.info('Please enter key words for search', notifyOptions);
    }
    this.props.onSubmit(this.state.value);
    this.setState({ value: '' });
  };

  render() {
    const { value } = this.state;
    //console.log(value);

    return (
      <Header>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormBtn>
            <HiMagnifyingGlass size="24" />
          </SearchFormBtn>
          <SearchFormInput
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={value}
            onChange={this.handleChange}
          />
        </SearchForm>
      </Header>
    );
  }
}

Searchbar.propType = {
  onSubmit: PropTypes.func.isRequired,
};
