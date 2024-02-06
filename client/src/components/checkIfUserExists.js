import axios from 'axios';

const checkIfUserExists = async (email) => {
  try {
    const response = await axios.post('http://localhost:5005/users/check-email', { email });
    return response.data.exists;
  } catch (error) {
    throw error;
  }
};

export default checkIfUserExists;

