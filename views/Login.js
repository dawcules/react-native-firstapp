import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  AsyncStorage,
} from 'react-native';
import FormTextInput from '../components/FormTextInput';
import useSignUpForm from '../hooks/LoginHooks';

const loginUrl = 'http://media.mw.metropolia.fi/wbma/login/';
const regUrl = 'http://media.mw.metropolia.fi/wbma/users/'


const Login = (props) => {
  const {inputs, handleUsernameChange, handlePasswordChange, handleEmailChange} = useSignUpForm();
  const {navigation} = props;
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
  }
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
