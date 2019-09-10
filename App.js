import React from 'react';
import {MediaProvider} from './contexts/MediaContext';
import Navigator from './navigators/Navigator';


const App = () => {
  return (
    <MediaProvider>
      <Navigator></Navigator>
    </MediaProvider>
  );
};

export default App;

// const UseFetch = (url) => {
//   const [media, setMedia] = useContext(StateCOntext);
//   const [loading, setLoading] = useState(true);
//   const fetchUrl = async () => {
//     const response = await fetch(url);
//     const json = await response.json();
//     setMedia(json);
//     setLoading(false);
//   };
//   UseEffect(fetchUrl, []);
//   return [media, loading]
// };
