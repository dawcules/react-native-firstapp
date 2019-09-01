import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import List from './components/List';
import {MediaProvider} from './contexts/MediaContext';


const App = () => {
  return (
    <MediaProvider style={{flex: 6}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightyellow'}}>
        <Text style ={{fontWeight: 700, fontSize: 40}}>Newsfeed</Text>
      </View>
      <View style={{position: 'absolute', left: 5, top: 31}}>
        <Image style={{height: 45, width: 45}} source={{uri: 'https://cdn4.iconfinder.com/data/icons/mono-color-web-mobile/250/Home-512.png'}} />
      </View>
      <View style={{flex: 5}}>
        <List />
      </View>
    </MediaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
