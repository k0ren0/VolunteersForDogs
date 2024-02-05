export const setProfileData = (data) => {
    return {
      type: 'SET_PROFILE_DATA',
      payload: data,
    };
  };
  
  export const setUsers = (users) => {
    return {
      type: 'SET_USERS',
      payload: users,
    };
  };
  