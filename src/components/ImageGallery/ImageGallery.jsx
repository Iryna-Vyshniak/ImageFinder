import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import imagesAPI from 'services/getImages';
import React from 'react';
import { List } from './ImageGallery.styled';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Loader } from '../Loader/Loader';
import ImageErrorView from 'components/ImageErrorView/ImageErrorView';
import { InitialStateGallery } from '../InitialStateGallery/InitialStateGallery';
import { Button } from 'components/Button/Button';
import { errorMessages } from 'utils/errorMessages';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export const ImageGallery = ({ value, page, onLoadMore }) => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    // якщо немає пошукового запиту - пошук не відбувається
    if (!value) {
      return;
    }
    if (page === 1) {
      setImages([]);
    }

    setStatus(Status.PENDING);

    imagesAPI
      .getImages(value, page)
      .then(images => {
        setImages(prevState => [...prevState, ...images.hits]);
        setTotalPages(Math.floor(images.totalHits / 12));
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, [value, page, onLoadMore]);

  if (status === Status.IDLE) {
    return <InitialStateGallery text="Let`s find images together!" />;
  }
  if (status === Status.PENDING) {
    // дозавантаження картинок до вже знайдених + картинка-лоадер, поки дозавантажуються зображення
    return (
      <>
        <List>
          {images.map(image => (
            <ImageGalleryItem key={image.id} item={image} />
          ))}
        </List>
        <Loader />;
      </>
    );
  }
  if (status === Status.REJECTED) {
    return <ImageErrorView message={error.message} />;
  }
  if (images.length === 0) {
    return <ImageErrorView message={errorMessages.imagesAPI} />;
  }

  if (status === Status.RESOLVED) {
    return (
      <>
        <List>
          {images.map(image => (
            <ImageGalleryItem key={image.id} item={image} />
          ))}
        </List>
        {images.length > 0 &&
          status !== Status.PENDING &&
          page <= totalPages && <Button onClick={onLoadMore}>Load More</Button>}
      </>
    );
  }
};

ImageGallery.propTypes = {
  value: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  onLoadMore: PropTypes.func.isRequired,
};

// export default class ImageGallery extends Component {
//   static propTypes = {
//     value: PropTypes.string.isRequired,
//   };

//   state = {
//     value: '',
//     images: [],
//     error: null,
//     status: Status.IDLE,

//     page: 1,
//     totalPages: 0,

//     isShowModal: false,
//     modalData: { img: DefaultImg, tags: '' },
//   };

//   static getDerivedStateFromProps(nextProps, prevState) {
//     if (prevState.value !== nextProps.value) {
//       return { page: 1, value: nextProps.value };
//     }
//     return null;
//   }

//   componentDidUpdate(prevProps, prevState) {
//     const { page } = this.state;
//     const prevValue = prevProps.value;
//     const nextValue = this.props.value;

//     if (prevValue !== nextValue || prevState.page !== page) {

//       this.setState({ status: Status.PENDING });

//       if (this.state.error) {
//         this.setState({ error: null });
//       }
//       imagesAPI
//         .getImages(nextValue, page)
//         .then(images => {

//           this.setState(prevState => ({
//             images:
//               page === 1 ? images.hits : [...prevState.images, ...images.hits],
//             status: Status.RESOLVED,
//             totalPages: Math.floor(images.totalHits / 12),
//           }));
//
//         })
//         .catch(error => this.setState({ error, status: Status.REJECTED }));
//     }
//   }

//   handleLoadMore = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//   };

//   setModalData = modalData => {
//     this.setState({ modalData, isShowModal: true });
//   };

//   handleModalClose = () => {
//     this.setState({ isShowModal: false });
//   };

//   render() {
//     const { images, error, status, page, totalPages, isShowModal, modalData } =
//       this.state;

//     if (status === 'idle') {
//       return <InitialStateGallery text="Let`s find images together!" />;
//     }
//     if (status === 'pending') {
//       return <Loader />;
//     }
//     if (status === 'rejected') {
//       return <ImageErrorView message={error.message} />;
//     }
//     if (images.length === 0) {
//       return (
//         <ImageErrorView
//           message={`Oops... there are no images matching your search... `}
//         />
//       );
//     }

//     if (status === 'resolved') {
//       return (
//         <>
//           <List>
//             {images.map(image => (
//               <ImageGalleryItem
//                 key={image.id}
//                 item={image}
//                 onImageClick={this.setModalData}
//               />
//             ))}
//           </List>
//           {images.length > 0 && status !== 'pending' && page <= totalPages && (
//             <Button status="load" onClick={this.handleLoadMore}>
//               Load More
//             </Button>
//           )}
//           {isShowModal && (
//             <Modal modalData={modalData} onModalClose={this.handleModalClose} />
//           )}
//         </>
//       );
//     }
//   }
// }

// !for infinity scroll
// const [offset, setOffset] = useState(0);
// useEffect(() => {
//   const handleScroll = e => {
//     const scrollHeight = e.target.documentElement.scrollHeight;
//     const currentHeight =
//       e.target.documentElement.scrollTop + window.innerHeight;
//     if (currentHeight + 1 >= scrollHeight) {
//       setOffset(offset + 10);
//     }
//   };
//   window.addEventListener('scroll', handleScroll);
//   return () => window.removeEventListener('scroll', handleScroll);
// }, [offset]);
