//import { RevolvingDot } from 'react-loader-spinner';
import React from 'react';
import { LoaderBackdrop, PendingDog } from './Loader.styled';
import Dog from 'assets/pending.png';
import DotLoader from 'react-spinners/DotLoader';

export const Loader = () => {
  return (
    <LoaderBackdrop>
      <DotLoader
        color="#f68000"
        size={150}
        cssOverride={{ position: 'absolute', top: '25%', left: '45%' }}
      />
      <PendingDog src={Dog} alt="Dog" />
    </LoaderBackdrop>
  );
};

// export const Loader = () => {
//   return (
//     <LoaderBackdrop>
//       <RevolvingDot
//         height="150"
//         width="150"
//         radius="50"
//         color="#FD5523"
//         secondaryColor="#37966F"
//         ariaLabel="revolving-dot-loading"
//         wrapperStyle={{ position: 'absolute', top: '45%', left: '45%' }}
//         wrapperClass="revolving-dot-wrapper"
//         visible={true}
//       />
//       <PendingDog src={Dog} alt="Dog" />
//     </LoaderBackdrop>
//   );
// };
