const validation = {
  'email': {
    // Email is required
    presence: true,
    // and must be an email (duh)
    email: true,
  },
  'password': {
    // Password is also required
    presence: true,
    // And must be at least 5 characters long
    length: {
      minimum: 5,
    },
  },
  'confirm-password': {
    // You need to confirm your password
    presence: true,
    // and it needs to be equal to the other password
    equality: 'password',
  },
  'username': {
    // You need to pick a username too
    presence: true,
    // And it must be between 3 and 20 characters long
    length: {
      minimum: 3,
      maximum: 20,
    },
  },
};

export default validation;
