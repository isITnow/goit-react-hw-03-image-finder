import s from './ImageGallery.module.css';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { fetchImages } from 'services/fetchImages';
import { Component } from 'react';
import { toast } from 'react-toastify';

export class ImageGallery extends Component {
  state = {
    // query: '',
    images: [],
    page: 1,
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    const { query } = this.props;
    const { page, images } = this.state;

    if (prevProps.query !== query || prevState.page !== page) {
      const currentPage = prevProps.query !== query ? 1 : page;

      fetchImages(query, currentPage).then(data => {
        if (!data.hits.length) {
          this.setState({ images: [], page: 1 });
          toast.warn(`No results matching "${query}"`);
          return;
        }

        if (prevProps.query === query) {
          this.setState({ images: [...images, ...data.hits] });
        }

        if (prevProps.query !== query) {
          this.setState({ images: data.hits });
        }
      });
      console.log(this.state);
    }
  }

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  // handleFetchImages = (query, page) => {
  //   fetchImages(query, page).then(data => {
  //     if (!data.hits.length) {
  //       this.setState({ images: [] });
  //       toast.warn(`No results matching "${query}"`);
  //       return;
  //     }

  //     this.setState({ images: data.hits });
  //   });
  // };

  render() {
    const { images } = this.state;
    // const { query } = this.props;

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
        {images.length > 0 && (
          <button
            type="submit"
            className={s.Button}
            onClick={this.handleLoadMore}
          >
            Load more
          </button>
        )}
      </>
    );
  }
}

// if (!images.length) {
//   toast.warn(`no result matching ${query}`);
//   return;
// }

// "idle" 'pending' 'resolved' 'rejected'
