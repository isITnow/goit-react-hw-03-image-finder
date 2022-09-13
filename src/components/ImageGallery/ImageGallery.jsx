import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { fetchImages } from 'services/fetchImages';
import { Component } from 'react';
import { toast } from 'react-toastify';
import { Loader } from 'components/Loader';
import s from './ImageGallery.module.css';
import PropTypes from 'prop-types';

export class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    isLoading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query } = this.props;
    const { page, images } = this.state;

    if (prevProps.query !== query || prevState.page !== page) {
      this.setState({ isLoading: true });

      if (prevProps.query !== query) {
        this.setState({ page: 1 });
      }
      const currentPage = prevProps.query !== query ? 1 : page;

      fetchImages(query, currentPage)
        .then(data => {
          if (!data.hits.length) {
            this.setState({ images: [], page: 1, isLoading: false });
            toast.warn(`No results matching "${query}"`);
            return;
          }

          this.setState({
            images: currentPage === 1 ? data.hits : [...images, ...data.hits],
            isLoading: false,
          });
        })
        .catch(error => console.log(error.message));
    }
  }

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, isLoading } = this.state;
    const { handleLoadMore } = this;

    return (
      <>
        <ul className={s.ImageGallery}>
          {images.map(({ id, webformatURL, largeImageURL, tags }) => (
            <ImageGalleryItem
              key={id}
              imgUrl={webformatURL}
              largeImgUrl={largeImageURL}
              tags={tags}
            />
          ))}
        </ul>
        {isLoading && <Loader />}
        {images.length > 0 && (
          <button type="submit" className={s.Button} onClick={handleLoadMore}>
            Load more
          </button>
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
};

// "idle" 'pending' 'resolved' 'rejected'
