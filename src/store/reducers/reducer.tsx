const initialState = {
    data: []
}

interface action {
    type: string;
    payload: object;
}

const reducer = (state = initialState, action: action ) => {

console.log(action)
    switch (action.type) {
        case "GET_USER_LIST":
            return {
                ...state,
                data: action.payload
            }
        default:
            return state
    }

}

export default reducer
