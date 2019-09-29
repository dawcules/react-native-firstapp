import React, {useContext, useEffect, useState} from 'react';
import {Container, Header, Content, Text, Thumbnail, Button} from 'native-base';
import FormTextInput from '../components/FormTextInput';
import useUploadForm from '../hooks/UploadHooks';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import {MediaContext} from '../contexts/MediaContext';
import validate from 'validate.js';

const dataUrl = 'http://media.mw.metropolia.fi/wbma/media';
const idUrl = 'http://media.mw.metropolia.fi/wbma/media/';
const picLink = 'http://media.mw.metropolia.fi/wbma/uploads/';
const mediaArray = [];


const Uploads = (props) => {
  const [image, setImage] = useState({});
  const [media, setMedia] = useContext(MediaContext);

  const {
    upload,
    handleTitleChange,
    handleDescChange,
    handleUpload,
    clearForm,
  } = useUploadForm();

  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });
    console.log(result);
    setImage(
        {
          selected: result.uri,
        });
  };

  const validateInputs = (upload, props) => {
    const constraints = {
      title: {
        presence: {
          message: '^You must enter a title!',
        },
        length: {
          minimum: 5,
          message: '^title must be atleast 5 characters',
        },
      },
      description: {
        presence: {
          message: '^You must give a description of your image!',
        },
        length: {
          minimum: 10,
          message: '^Description must be atleast 10 characters',
        },
      },
    };
    const titleError = validate({title: upload.title}, constraints);
    const descError = validate(
        {description: upload.desc},
        constraints
    );
    if (!titleError.title && !descError.description) {
      handleUpload(image.selected, upload.title, upload.desc);
      console.log();
      clearForm();
      // setImage();
      setMedia([]);

      setTimeout(() => {
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
                      mediaArray.push(result);
                      setMedia(mediaArray);
                    });
              });
            });
        props.navigation.navigate('Home');
      }, 2000);
    } else {
      const errorArray = [titleError.title, descError.description];

      for (let i = 0; i < errorArray.length; i++) {
        if (errorArray[i]) {
          console.log('alert:', errorArray[i][0]);
          alert(errorArray[i][0]);
        }
      }
    }
  };

  useEffect(() => {
    getPermissionAsync();
  }
  , []);

  return (
    <Container>
      <Header />
      <Content>
        <Thumbnail source={{uri: image.selected}}/>
        <Text>Upload</Text>
        <FormTextInput
          autoCapitalize='none'
          placeholder='title'
          onChangeText={handleTitleChange}
          value= {upload.title} required
        />
        <FormTextInput
          autoCapitalize='none'
          placeholder='description'
          onChangeText={handleDescChange}
          value={upload.desc} required
        />
        <Button onPress={() => pickImage()}>
          <Text>Show image</Text>
        </Button>
        <Button onPress={() => {
          validateInputs(upload, props);
        // handleUpload(image.selected).then(
        //   props.navigation.navigate('Home')
        }}>
          <Text>Upload</Text>
        </Button>
        <Button
          onPress={() => {
            clearForm();
          }}
        >
          <Text>Reset</Text>
        </Button>

      </Content>
    </Container>
  );
};

export default Uploads;
