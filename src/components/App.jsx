import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import s from './App.module.css';
import { ImageGallery } from './ImageGallery';
import { Searchbar } from './Searchbar';

export class App extends Component {
  state = {
    query: '',
  };

  handleSubmit = query => {
    this.setState({ query });
  };

  render() {
    const { query } = this.state;
    return (
      <div className={s.App}>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery query={query} />
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}
