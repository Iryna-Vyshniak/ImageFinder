import { useState } from 'react';
import { GlobalStyle } from './GlobalStyle';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Layout } from './Layout/Layout';

export const App = () => {
  const [textSearch, setTextSearch] = useState('');
  const [page, setPage] = useState(1);

  const handleSearchSubmit = textSearch => {
    setTextSearch(textSearch);
    setPage(1);
  };

  // custom method to btn load
  const handleLoadMore = () => {
    setPage(prevSate => prevSate + 1);
  };

  return (
    <>
      <Searchbar onSubmit={handleSearchSubmit} />
      <Layout>
        <ImageGallery
          value={textSearch}
          page={page}
          onLoadMore={handleLoadMore}
        />
      </Layout>
      <ToastContainer transition={Slide} draggablePercent={60} />
      <GlobalStyle />
    </>
  );
};

// export default class App extends Component {

//   state = {
//     textSearch: '',
//   };

//   handleSubmit = textSearch => {
//     this.setState({ textSearch });
//   };

//   render() {
//     const { textSearch } = this.state;

//     return (
//       <>
//         <Searchbar onSubmit={this.handleSubmit} />
//         <Layout>
//           <ImageGallery value={textSearch} />
//         </Layout>
//         <ToastContainer transition={Slide} draggablePercent={60} />
//         <GlobalStyle />
//       </>
//     );
//   }
// }
