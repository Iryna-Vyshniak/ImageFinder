import { useState } from 'react';
import { GlobalStyle } from './GlobalStyle';

import { Searchbar } from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Layout } from './Layout/Layout';

export const App = () => {
  const [textSearch, setTextSearch] = useState('');

  return (
    <>
      <Searchbar onSubmit={setTextSearch} />
      <Layout>
        <ImageGallery value={textSearch} />
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
