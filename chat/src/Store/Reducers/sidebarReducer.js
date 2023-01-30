const sidebarReducer = (state = 'Chats', action) => {
    switch (action.type) {
        case 'SIDEBAR':
            return action.name;
        default:
            return state
    }
};

export default sidebarReducer;
