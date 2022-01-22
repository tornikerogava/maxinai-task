const initialState = {
    allUsers:[],
    currentPageUsers: [],
    currentPage: 1,
    usersPerPage: 20,
}

interface User {
    id: number
    first_name: string
    last_name: string
    email: string
}

interface action {
    type: string
    payload: User
}

const reducer = (state = initialState, action: action ) => {

    switch (action.type) {
        case "GET_USER_LIST":
            return {
                ...state,
                allUsers: action.payload
            }
        case "GET_PAGE_USERS":
            return{
                ...state,
                currentPageUsers: action.payload
            }
        case "CHANGE_PAGE":
            return{
                ...state,
                currentPage: action.payload
            }
        case "DELETE_USER":
            return{
                ...state,
                allUsers: state.allUsers.filter(({id})=> id !== action.payload)
            }
        case "EDIT_USER":
            return{
                ...state,
                allUsers: state.allUsers.map((user: User)=> user.id === action.payload.id ? action.payload : user)
            }
        default:
            return state
    }
}

export default reducer
