import { Component } from 'react';
import { Modal } from '../Modal';
import s from './ImageGalleryItem.module.css';

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  handleToggleModal = () => {
    this.setState(prevState => ({ isModalOpen: !prevState.isModalOpen }));
  };

  render() {
    const { imgUrl, largeImgUrl, tags } = this.props;
    const { isModalOpen } = this.state;
    const { handleToggleModal } = this;

    return (
      <li className={s.ImageGalleryItem}>
        <img
          onClick={handleToggleModal}
          className={s.ImageGalleryItem__image}
          src={imgUrl}
          alt={tags.split(',')}
        />
        {isModalOpen && (
          <Modal
            largeImgUrl={largeImgUrl}
            tags={tags}
            onCloseModal={handleToggleModal}
          >
            <img src={largeImgUrl} alt={tags.split(',')} />
          </Modal>
        )}
      </li>
    );
  }
}
