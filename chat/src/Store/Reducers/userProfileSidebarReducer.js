const userProfileSidebarReducer = (state = false, action) => {
  switch (action.type) {
    case "USER_PROFILE":
      return !state;
    default:
      return state;
  }
};

export default userProfileSidebarReducer;
