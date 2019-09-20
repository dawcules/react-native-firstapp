import React, {useEffect} from 'react';
import {StyleSheet, View, Text, Button, AsyncStorage, Alert} from 'react-native';
import FormTextInput from '../components/FormTextInput';
import useSignUpForm from '../hooks/LoginHooks';
import validate from 'validate.js';

const loginUrl = 'http://media.mw.metropolia.fi/wbma/login/';
const regUrl = 'http://media.mw.metropolia.fi/wbma/users/';
const avatarUrl = 'http://media.mw.metropolia.fi/wbma/tags/avatar_2204';
const mediaUrl = 'http://media.mw.metropolia.fi/wbma/media/';

const Login = (props) => {
  const {
    inputs,
    handleFormChange,
  } = useSignUpForm();
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

  const signInAsync = async (inputs, props) => {
    console.log(props.inputs);
    console.log(inputs.password);
    const data = {
      username: inputs.username,
      password: inputs.password,
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

  const SignUpForm = () => {
    const {
      inputs,
      handleUsernameChange,
      handlePasswordChange,
      handlePasswordConfChange,
      handleEmailChange,
    } = useSignUpForm();
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
          <Button title="Sign up!" onPress={() => regValidation(inputs, props)} />
          <Button title="Sign in instead!" onPress={() => handleFormChange(<SignInForm />)} />
        </View>
      </View>
    );
  };

  const SignInForm = () => {
    const {
      inputs,
      handleUsernameChange,
      handlePasswordChange,
    } = useSignUpForm();
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
          <Button title="Sign in!" onPress={() => signInAsync(inputs, props)} />
          <Button title="Sign up instead!" onPress={() => handleFormChange(<SignUpForm />)} />
        </View>
      </View>
    );
  };

  const signUpAsync = async (inputs, props) => {
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
    signInAsync(inputs, props);
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

  const regValidation = async (inputs, props) => {
    const constraints = {
      email: {
        presence: {
          message: '^Please enter an email address',
        },
        email: {
          message: '^Please enter a valid email address',
        },
      },
      password: {
        presence: {
          message: '^Please enter a password',
        },
        length: {
          minimum: 5,
          message: '^Your password must be at least 5 characters',
        },
      },
      username: {
        presence: {
          message: '^Please enter an username',
        },
        length: {
          minimum: 3,
          message: '^Username must be at least 3 characters',
        },
      },
      confirmPassword: {
        equality: 'password',
      },
    };
    const emailError = validate({email: inputs.email}, constraints);
    const passwordError = validate({password: inputs.password}, constraints);
    const passconfError = validate({password: inputs.password, confirmPassword: inputs.passwordconf}, constraints);
    const usernameError = validate({username: inputs.username}, constraints);

    console.log(emailError.email, passwordError.password, usernameError.username, passconfError.confirmPassword);
    if (!emailError.email && !passwordError.password && !usernameError.username && !passconfError.confirmPassword) {
      signUpAsync(inputs, props);
      console.log('KAIKKI OIKEIN = REKISTERÖI');
    } else {
      const errorArr = [emailError.email, passwordError.password, usernameError.username, passconfError.confirmPassword];
      for (let i=0; i< errorArr.length; i++) {
        if (errorArr[i]) {
          alert(errorArr[i]);
        }
      }
    }
  };

  useEffect(() => {
    handleFormChange(<SignInForm />);
  }
  , []);

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
