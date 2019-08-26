import React from 'react';
import {FlatList, Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import ListItem from './ListItem';

const List = (props) => {
  return (
    <FlatList
      data={props.mediaArray}
      renderItem={({item}) => <ListItem singleMedia={item} />}
    />
  );
};


List.propTypes = {
  mediaArray: PropTypes.array,
};

export default List;
