
// Filters Reducer

export const employeeInitialState = {
    employeeArr: [],

};
export const employeeReducer = (state = employeeInitialState, action) => {
    switch (action.type) {
        case 'SET_EMPLOYEE_ARRAY':
            return {
                employeeArr: action.payload
            };
        default: return state

    }
}