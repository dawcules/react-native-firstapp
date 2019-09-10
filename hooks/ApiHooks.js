import AsyncStorage from 'react-native';
import {useContext, useEffect} from 'react';
import {MediaContext} from '../contexts/MediaContext';

const userToContext = async () => { // Call this when app starts (= Home.js)
  const {user, setUser} = useContext(MediaContext);
  const getFromStorage = async () => {
    const storageUser = JSON.parse(await AsyncStorage.getItem('user'));
    console.log('storage', storageUser);
    setUser(storageUser);
  };
  useEffect(() => {
    getFromStorage();
  }, []);
  return [user];
};

export default userToContext;
