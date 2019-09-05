import React from 'react';
import {Image, Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';


const ListItem = (props) => {
  const {navigation, singleMedia} = props;
  return (
    <View style ={{marginTop: 10}}>
      <TouchableOpacity onPress={
        () => {
          navigation.push('Single', {thumbnails: singleMedia});
        }
      }
      style={styles.row} >
        {props.singleMedia.thumbnails.w160 && <Image style={styles.image}
          source={{uri: props.singleMedia.thumbnails.w160}}
        />}
        <View style = {styles.textbox}>
          <Text numberOfLines={1} style={styles.listTitle}>{props.singleMedia.title}</Text>
          <Text numberOfLines={5}> {props.singleMedia.description}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    padding: 15,
    marginBottom: 5,
    backgroundColor: '#eee',
    borderRadius: 16,
  },
  imagebox: {
    flex: 1,
  },
  image: {
    flex: 1,
    borderRadius: 16,
  },
  textbox: {
    flex: 2,
    padding: 10,
  },
  listTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingBottom: 15,
  },
});

ListItem.propTypes = {
  singleMedia: PropTypes.object,
};

export default ListItem;
