import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';

const Single = (props) => {
  console.log(props);
  const {navigation} = props;
  const thumbnail = navigation.getParam('thumbnails', 'WRONG');
  console.log(JSON.stringify(thumbnail.thumbnails.w160));
  const title = thumbnail.title;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Image style={styles.image} source={{uri: thumbnail.thumbnails.w160}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  image: {
    flex: 1,
    borderRadius: 16,
    maxHeight: 200,
    width: 200,
  },
  title: {
    fontSize: 40,
    fontWeight: '600',
  },
});

export default Single;
