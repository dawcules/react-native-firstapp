import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  AsyncStorage,
} from 'react-native';
import FormTextInput from '../components/FormTextInput';
import useSignUpForm from '../hooks/LoginHooks';

const loginUrl = 'https://media.mw.metropolia.fi/wbma/login/';
const regUrl = 'https://media.mw.metropolia.fi/wbma/users/';
const avatarUrl = 'https://media.mw.metropolia.fi/wbma/tags/avatar_2204';
const mediaUrl = 'https://media.mw.metropolia.fi/wbma/media/';


const Login = (props) => {
  const {
    inputs,
    handleUsernameChange,
    handlePasswordChange,
    handleEmailChange,
  } = useSignUpForm();

  const {navigation} = props;

  const fetchAvatar = async (props) => {
    const response = await fetch(avatarUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const result = await response.json();
    const resultArray = result[0];
    await console.log('Avatar paketti', result);
    await console.log('Avatar id', resultArray.file_id);

    const userMediaUrl = mediaUrl+resultArray.file_id;

    const aFileResponse = await fetch(userMediaUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const aFileResult = await aFileResponse.json();
    await console.log('AFILERESULT', aFileResult);
    await console.log('Fileresultpic', aFileResult.thumbnails.w160);
    await AsyncStorage.setItem('useravatar', JSON.stringify(aFileResult));
  };


  const signInAsync = async (props) => {
    console.log(inputs.username);
    console.log(inputs.password);
    const data = {
      username: inputs.username,
      password: inputs.password,
    };
    const response = await fetch(loginUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log(result);
    await console.log(result.user.username);
    await AsyncStorage.setItem('userToken', result.token);
    await AsyncStorage.setItem('username', result.user.username);
    await AsyncStorage.setItem('useremail', result.user.email);
    await AsyncStorage.setItem('userid', JSON.stringify(result.user.user_id));
    fetchAvatar();
    navigation.navigate('App');
  };

  const signUpAsync = async (props) => {
    const data = {
      username: inputs.username,
      password: inputs.password,
      email: inputs.email,
    };
    const response = await fetch(regUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log('REKKAUS', result);
    signInAsync();
  };
  return (
    <View style ={{flex: 2}}>
      <View style={styles.container}>
        <Text>Login</Text>
        <View style={styles.form}>
          <FormTextInput
            autoCapitalize='none'
            placeholder='username'
            onChangeText={handleUsernameChange}
            value= {inputs.username} required
          />
          <FormTextInput
            autoCapitalize='none'
            placeholder='password'
            secureTextEntry={true}
            onChangeText={handlePasswordChange}
            value={inputs.password} required
          />
          <Button title="Sign in!" onPress={signInAsync} />
        </View>
      </View>

      <View style={styles.container}>
        <Text>Register</Text>
        <View style={styles.form}>
          <FormTextInput
            autoCapitalize='none'
            placeholder='username'
            onChangeText={handleUsernameChange}
            value= {inputs.username} required
          />
          <FormTextInput
            autoCapitalize='none'
            placeholder='password'
            secureTextEntry={true}
            onChangeText={handlePasswordChange}
            value={inputs.password} required
          />
          <FormTextInput
            autoCapitalize='none'
            placeholder='email'
            onChangeText={handleEmailChange}
            value= {inputs.email} required
          />
          <Button title="Sign up!" onPress={signUpAsync} />
        </View>
      </View>
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

// proptypes here

export default Login;
