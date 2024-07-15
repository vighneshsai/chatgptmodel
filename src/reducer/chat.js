
// Filters Reducer

export const chatInitialState = {
    chatArr: [],

};
export const chatReducer = (state = chatInitialState, action) => {
    switch (action.type) {
        case 'SET_INITIAL_ARRAY':
            return {
                chatArr: action.payload
            };
        default: return state

    }
}