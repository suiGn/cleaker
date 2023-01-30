const profileSidebarReducer = (state = false, action) => {
  switch (action.type) {
    case "PROFILE":
      return !state;
    default:
      return state;
  }
};

export default profileSidebarReducer;
