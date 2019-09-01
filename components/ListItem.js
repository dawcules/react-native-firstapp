import React from 'react';
import {Image, Text, View, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';


const ListItem = (props) => {
  return (
    <View style ={{marginTop: 10}}>
      <TouchableOpacity style={{flex: 2, flexWrap: 'wrap', flexDirection: 'row', padding: 10, backgroundColor: 'lightgray', borderRadius: 20}}>
        <Image style={{flex: 1, padding: 5, marginRight: 15, borderRadius: 50, height: 100, width: 100}}
          source={{uri: props.singleMedia.thumbnails.w160}}
        />
        <View style = {{flex: 1}}>
          <Text numberOfLines={1} style={{fontWeight: '800', fontSize: 20}}>{props.singleMedia.title}</Text>
          <Text numberOfLines={5}> {props.singleMedia.description}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object,
};

export default ListItem;
