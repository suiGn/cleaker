const pageTourReducer = (state = false, action) => {
    switch (action.type) {
        case 'PAGE_TOUR':
            return !state;
        default:
            return state
    }
};

export default pageTourReducer;
