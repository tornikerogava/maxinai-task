import axios from "axios"



// TODO: add type to dispatch
 export const fetchUserList = () => {
     return (dispatch:any) => {
         axios.get("/data/im-a-real-api.json").then(response => {
             dispatch({
                 type: "GET_USER_LIST",
                 payload: response.data
             })
         })
     }
 }


