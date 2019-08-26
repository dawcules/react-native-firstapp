import React from 'react';
import {FlatList, Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';


const ListItem = (props) => {
  return (
    <View style ={{marginTop: 10}}>
      <TouchableOpacity style={{flex: 2, flexWrap: 'wrap', flexDirection: 'row', padding: 10, marginBottom: 10, backgroundColor: 'lightgray'}}>
        <Image style={{flex: 1, padding: 5, marginRight: 15}}
          source={{uri: props.singleMedia.thumbnails.w160}}
        />
        <View style = {{flex: 1}}>
          <Text style={{fontWeight: '800', fontSize: 35}}>{props.singleMedia.title}</Text>
          <Text>{props.singleMedia.description}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object,
};

export default ListItem;
