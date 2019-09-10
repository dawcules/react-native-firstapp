import React, {useEffect, useState} from 'react';
import {AsyncStorage} from 'react-native';
import {Container, Header, Content, Thumbnail, Text, Button} from 'native-base';

const picLink = 'http://media.mw.metropolia.fi/wbma/uploads/';


const Profile = (props) => {
  const [user, setUser] = useState({});
  const getUser = async () => {
    const gotuname = await AsyncStorage.getItem('username');
    const gotemail = await AsyncStorage.getItem('useremail');
    const gotuid = await AsyncStorage.getItem('userid');
    const gotavatar = await AsyncStorage.getItem('useravatar');
    const parsedAvatar = await JSON.parse(gotavatar);
    console.log('objekti?', parsedAvatar);
    const fileAvatar = await parsedAvatar.thumbnails.w160;
    console.log('parsed avatar', fileAvatar);

    setUser(
        {
          username: gotuname,
          useremail: gotemail,
          userid: gotuid,
          avatar: fileAvatar,
        });
  };

  useEffect(() => {
    getUser();
  }
  , []);
  console.log('useravatar', user.avatar);
  console.log('username', user.username);
  const signOutAsync = async () => {
    console.log(user);
    await AsyncStorage.clear();
    props.navigation.navigate('Auth');
  };
  return (
    <Container>
      <Header />
      <Content>
        <Thumbnail square large source={{uri: picLink + user.avatar}} />
        <Text>Username: {user.username}</Text>
        <Text>Email: {user.useremail}</Text>
        <Text>User ID: {user.userid}</Text>
        <Button onPress={signOutAsync}>
          <Text>Log out</Text>
        </Button>
      </Content>
    </Container>
  );
};


export default Profile;
