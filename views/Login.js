import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  AsyncStorage,
  Alert,
} from 'react-native';
import FormTextInput from '../components/FormTextInput';
import useSignUpForm from '../hooks/LoginHooks';
import validate from 'validate.js';
import validation from '../validation/validation';

const loginUrl = 'http://media.mw.metropolia.fi/wbma/login/';
const regUrl = 'http://media.mw.metropolia.fi/wbma/users/';
const avatarUrl = 'http://media.mw.metropolia.fi/wbma/tags/avatar_2204';
const mediaUrl = 'http://media.mw.metropolia.fi/wbma/media/';

const Login = (props) => {
  const {navigation} = props;

  const checkUser = async (uname) => {
    const response = await fetch(regUrl + '/username/' + uname, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).catch((error) => {
      console.error(error);
    });
    const result = await response.json();
    const unameStatus = result.available;
    console.log('UNAME RESULT', result);
    if (!unameStatus) {
      Alert.alert(
          'Error',
          'Username already taken',
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          {cancelable: false},
      );
    }
  };

  const SignUpForm = () => {
    return (
      <View style={styles.container}>
        <Text>Register</Text>
        <View style={styles.form}>
          <FormTextInput
            autoCapitalize='none'
            placeholder='username'
            onChangeText={handleUsernameChange}
            onEndEditing={(evt) => {
              const uname = evt.nativeEvent.text;
              checkUser(uname);
            }}
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
            placeholder='confirm password'
            secureTextEntry={true}
            onChangeText={handlePasswordConfChange}
            value={inputs.passwordconf} required
          />
          <FormTextInput
            autoCapitalize='none'
            placeholder='email'
            onChangeText={handleEmailChange}
            value= {inputs.email} required
          />
          <Button title="Sign up!" onPress={regValidation} />
          <Button title="Sign in instead!" onPress={() => handleFormChange(<SignInForm />)} />
        </View>
      </View>
    );
  };

  const SignInForm = () => {
    return (
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
          <Button title="Sign up instead!" onPress={() => handleFormChange(<SignUpForm />)} />
        </View>
      </View>
    );
  };

  const {
    inputs,
    handleUsernameChange,
    handlePasswordChange,
    handlePasswordConfChange,
    handleEmailChange,
    handleFormChange,
  } = useSignUpForm();

  useEffect(() => {
    handleFormChange(<SignInForm />);
  }
  , []);

  const signInAsync = async (props) => {
    console.log(inputs.username);
    console.log(inputs.password);
    const data = {
      username: await inputs.username,
      password: await inputs.password,
    };
    console.log(data);
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

  const regValidation = async () => {
    console.log('validemail ', inputs.email);
    const emailError = validate(validation['email'], inputs.email);
    // const passwordError = validate('password', inputs.password)
    if (!emailError) {
      alert('Details are valid!');
    }
    // signUpAsync();
  };

  return (
    <View style ={{flex: 2}}>
      {inputs.form}
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
