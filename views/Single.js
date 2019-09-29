import React, {useState} from 'react';
import {StyleSheet, View, Text, Image, AsyncStorage} from 'react-native';
import {Video} from 'expo-av';

const Single = (props) => {
  console.log(props);
  const {navigation} = props;
  const media = navigation.getParam('thumbnails', 'WRONG');
  console.log(JSON.stringify(media.thumbnails.w160));
  const title = media.title;
  const uid = media.user_id;
  console.log('UID', uid);

  const [uname, setUname] = useState({});


  const checkUser = async () => {
    const gotToken = await AsyncStorage.getItem('userToken');
    const response = await fetch('http://media.mw.metropolia.fi/wbma/users/'+ uid, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-access-token': gotToken,
      },
    }).catch((error) => {
      console.error(error);
    });
    const result = await response.json();
    console.log('USEROBJ', result);
    setUname(
        {
          name: result.username,
        });
  };
  checkUser();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text>{media.description}</Text>
      <Text>{uname.name}</Text>
      <Image style={styles.image} source={{uri: media.thumbnails.w160}} />
      <Video
        source={{uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'}}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"got
        shouldPlay
        isLooping
        style={{width: 300, height: 300}}
      />
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
