import React, {useState} from 'react';
import {StyleSheet, View, Image, AsyncStorage} from 'react-native';
import {Container, Content, Text, Card, CardItem, H2, Body} from 'native-base';
import AImage from '../components/AsyncImage';


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

    <Container>
      <Content>
        <Card>
          <CardItem>
            <Body>
              <H2>{title}</H2>
              <Text note>by: {name.username}</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Body>
              {media.media_type === 'image' &&
                <AImage
                  source={{uri: 'http://media.mw.metropolia.fi/wbma/uploads/' + file.filename}}
                  style={{
                    borderRadius: 50,
                    width: '100%',
                    height: 500,
                  }}
                  spinnerColor='#b3e5fc'
                />
              }
              {media.media_type === 'video' &&
                <Video source={{uri: 'http://media.mw.metropolia.fi/wbma/uploads/' + file.filename}}
                  style={{
                    width: '100%',
                    height: 500,
                  }}
                  useNativeControls={true}
                />
              }
            </Body>
          </CardItem>
          <CardItem>
            <Text>{media.description}</Text>
          </CardItem>
        </Card>
      </Content>
    </Container>
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
