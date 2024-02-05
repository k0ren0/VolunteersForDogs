const initialState = {
    profileData: {},
    users: [],
  };
  
  const profileReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_PROFILE_DATA':
        return {
          ...state,
          profileData: action.payload,
        };
      case 'SET_USERS':
        return {
          ...state,
          users: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default profileReducer;
  