import React, { Component } from 'react';
import { GlobalStyle } from './GlobalStyle';
//import { Layout } from './Layout/Layout';

import { Searchbar } from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Layout } from './Layout/Layout';

export default class App extends Component {
  state = {
    textSearch: '',
  };

  componentDidMount() {}

  componentWillUnmount() {}

  // custom methods
  handleSubmit = textSearch => {
    this.setState({ textSearch });
  };

  render() {
    const { textSearch } = this.state;
    // console.log('state:', this.state);

    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />
        <Layout>
          <ImageGallery value={textSearch} />
        </Layout>
        <ToastContainer transition={Slide} draggablePercent={60} />
        <GlobalStyle />
      </>
    );
  }
}
