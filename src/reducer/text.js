
// Filters Reducer

export const TextInitialState = {
    text: "",
    indexArr:0

};
export const textReducer = (state = TextInitialState, action) => {
    switch (action.type) {
        case 'TEXT_INITIAL_ARRAY':
            return {
                text: action.payload,
                indexArr:action.indexArr
            };
        default: return state

    }
}