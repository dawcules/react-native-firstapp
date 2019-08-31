import React from 'react';
import {useContext, useEffect} from 'react';
// eslint-disable-next-line max-len
import {FlatList} from 'react-native';
import PropTypes from 'prop-types';
import ListItem from './ListItem';
import {MediaContext} from '../contexts/MediaContext';


const List = () => {
  const [media, setMedia] = useContext(MediaContext);

  const getData = () => {
    const picLink = 'http://media.mw.metropolia.fi/wbma/uploads/';
    const dataUrl = 'http://media.mw.metropolia.fi/wbma/media';
    const idUrl = 'http://media.mw.metropolia.fi/wbma/media/';
    const mediaArray = [];
    fetch(dataUrl)
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          result.forEach((n) => {
            const id = n.file_id;
            fetch(idUrl + id)
                .then((response) => {
                  return response.json();
                })
                .then((result) => {
                  result.thumbnails.w160 = picLink + result.thumbnails.w160;
                  console.log(result.thumbnails.w160);
                  mediaArray.push(result);
                  setMedia(mediaArray);
                });
          });
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
