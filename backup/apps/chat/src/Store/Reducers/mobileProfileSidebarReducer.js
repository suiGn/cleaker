const mobileProfileSidebarReducer = (state = false, action) => {
    switch (action.type) {
        case 'MOBILE_PROFILE':
            return !state;
        default:
            return state
    }
};

export default mobileProfileSidebarReducer;
