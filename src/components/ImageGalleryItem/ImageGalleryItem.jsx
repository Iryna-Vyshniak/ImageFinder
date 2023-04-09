import { ListItem, Picture } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ item, onImageClick }) => {
  const { largeImageURL, tags, webformatURL } = item;
  //console.log(item);
  return (
    <ListItem
      onClick={e => {
        e.preventDefault();
        onImageClick({ largeImageURL, tags });
      }}
    >
      <div>
        <Picture src={webformatURL} alt={tags} loading="lazy" />
      </div>
    </ListItem>
  );
};

ImageGalleryItem.propTypes = {
  item: PropTypes.shape({
    tags: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
  onImageClick: PropTypes.func.isRequired,
};
