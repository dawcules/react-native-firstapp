import React from 'react';
import {StyleSheet, View} from 'react-native';
import List from './components/List';
import {MediaProvider} from './contexts/MediaContext';


const App = () => {
  return (
    <MediaProvider>
      <View>
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
