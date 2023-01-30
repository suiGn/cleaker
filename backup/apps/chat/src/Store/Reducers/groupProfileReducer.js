const  groupProfileReducer = (state = false, action) => {
  switch (action.type) {
    case "GROUP_PROFILE":
      return !state;
    default:
      return state;
  }
};

export default groupProfileReducer;
