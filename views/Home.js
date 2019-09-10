import React from 'react';
import {View} from 'react-native';
import List from '../components/List';

const Home = (props) => {
  const {navigation} = props;
  return (
    <View>
      <List navigation={navigation}></List>
    </View>
  );
};

export default Home;

// const UseFetch = (url) => {
//   const [media, setMedia] = useContext(StateCOntext);
//   const [loading, setLoading] = useState(true);
//   const fetchUrl = asunc () => {
//     const response = await fetch(url);
//     const json = await response.json();
//     setMedia(json);
//     setLoading(false);
//   };
//   UseEffect(fetchUrl, []);
//   return [media, loading]
// };
