import {useState} from 'react';
import {AsyncStorage} from 'react-native';

const useUploadForm = () => {
  const [upload, setUpload] = useState({});

  const handleTitleChange = (text) => {
    setUpload((upload) =>
      ({
        ...upload,
        title: text,
      }));
  };
  const handleDescChange = (text) => {
    setUpload((upload) =>
      ({
        ...upload,
        desc: text,
      }));
  };

  const handleUpload = async (file) => {
    const gotToken = await AsyncStorage.getItem('userToken');
    const localUri = file;
    const filename = localUri.split('/').pop();
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : `image`;
    const formData = new FormData();
    //formData.append('image', {file: file, title: upload.title, description: upload.desc});
    formData.append('file', {uri: localUri, name: filename, type});
    formData.append('title', upload.title);
    formData.append('description', upload.desc);
    console.log('formdata', formData);

    const response = await fetch('http://media.mw.metropolia.fi/wbma/media', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        'x-access-token': gotToken,
      },
      body: formData,
    });
    const json = await response.json();
    console.log(json);

    // TÄNNE
  };

  const clearForm = () => {
    setUpload("");
  };

  // const handleFormChange = (form) => {
  //   setInputs((inputs) =>
  //     ({
  //       ...inputs,
  //       form: form,
  //     }));
  // };
  return {
    handleTitleChange,
    handleDescChange,
    handleUpload,
    upload,
    clearForm,
  };
};


export default useUploadForm;
