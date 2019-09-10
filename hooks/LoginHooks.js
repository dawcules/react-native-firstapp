import {useState} from 'react';

const useSignUpForm = () => {
  const [inputs, setInputs] = useState({});
  const handleUsernameChange = (text) => {
    console.log('vaihdetaan username ', text);
    setInputs((inputs) =>
      ({
        ...inputs,
        username: text,
      }));
  };
  const handlePasswordChange = (text) => {
    setInputs((inputs) =>
      ({
        ...inputs,
        password: text,
      }));
  };
  const handlePasswordConfChange = (text) => {
    setInputs((inputs) =>
      ({
        ...inputs,
        passwordconf: text,
      }));
  };
  const handleEmailChange = (text) => {
    console.log('vaihdetaan uusi mail ', text);
    setInputs((inputs) =>
      ({
        ...inputs,
        email: text,
      }));
  };
  const handleFormChange = (form) => {
    setInputs((inputs) =>
      ({
        ...inputs,
        form: form,
      }));
  };
  return {
    handleUsernameChange,
    handlePasswordChange,
    handlePasswordConfChange,
    handleEmailChange,
    handleFormChange,
    inputs,
  };
};

export default useSignUpForm;
