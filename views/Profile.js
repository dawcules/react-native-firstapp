import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Button, AsyncStorage} from 'react-native';


const Profile = (props) => {
  const [user, setUser] = useState({});
  const getUser = async () => {
    const gotuname = await AsyncStorage.getItem('username');
    const gotemail = await AsyncStorage.getItem('useremail');
    const gotuid = await AsyncStorage.getItem('userid');
    setUser(
        {
          username: gotuname,
          useremail: gotemail,
          userid: gotuid});
  };

  useEffect(() => {
    getUser();
  }
  , []);
  const signOutAsync = async () => {
    await console.log(user);
    await AsyncStorage.clear();
    props.navigation.navigate('Auth');
  };
  return (
    <View style={styles.container}>
      <Text>Username: {user.username}</Text>
      <Text>Email: {user.useremail}</Text>
      <Text>User ID: {user.userid}</Text>
      <Button title="Logout!" onPress={signOutAsync} />
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
});

export default Profile;
