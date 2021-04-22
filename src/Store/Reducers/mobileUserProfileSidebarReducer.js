const mobileUserProfileSidebarReducer = (state = false, action) => {
  switch (action.type) {
    case "MOBILE_USER_PROFILE":
      return !state;
    default:
      return state;
  }
};

export default mobileUserProfileSidebarReducer;
