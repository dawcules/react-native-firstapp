import React from 'react';
import {useContext, useState, useEffect} from 'react';
// eslint-disable-next-line max-len
import {FlatList, Text} from 'react-native';
import PropTypes from 'prop-types';
import ListItem from './ListItem';
import {MediaContext} from '../contexts/MediaContext';
import Data from './Data';


const List = () => {
  const [media, setMedia] = useContext(MediaContext);

  const getData = () => {
    fetch('https://raw.githubusercontent.com/mattpe/wbma/master/docs/assets/test.json')
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      setMedia(result);
    });
  };
  useEffect(() => getData(), []);

  return (
      <FlatList
        data={media}
        renderItem={({item}) => <ListItem singleMedia={item} />}
      />
  );
};


List.propTypes = {
  mediaArray: PropTypes.array,
};

export default List;
