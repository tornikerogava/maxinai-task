import axios from "axios";


export const fetchUserList = () => {
    return (dispatch: any) => {
        axios.get("/data/im-a-real-api.json").then(response => {
            dispatch({
                type: "GET_USER_LIST",
                payload: response.data
            })
        })
    }
}

export const getCurrentPageUsers = (allUsers: any[], page: number, perPage: number) => {
    const offset = (page - 1) * perPage
    return (dispatch: any) => {
        dispatch({
            type: "GET_PAGE_USERS",
            payload: allUsers.slice(offset, offset + perPage)
        })
    }
}

export const changePage = (page: number) => {
    return (dispatch: any) => {
        dispatch({
            type: "CHANGE_PAGE",
            payload: page
        })
    }
}

export const deleteUser = (id: number | undefined) => {
    return (dispatch: any) => {
        dispatch({
            type: "DELETE_USER",
            payload: id
        })
    }
}

export const editUser = (editedUser: object) => {
    return (dispatch: any) => {
        dispatch({
            type: "EDIT_USER",
            payload: editedUser
        })
    }
}

