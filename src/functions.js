import { adminStore, store } from "./index";
import { baseUrl } from "./index";
const checkForAuth = async () => {
    return await fetch(`${baseUrl}/checkAuth`,{mode: "cors",credentials: 'include'}).then((res) => {
        return res.json();
    }).then((data)=> { 
        store.dispatch({type: 'SET_AUTH_STATE',status: data.status,user: data.user,isAdmin: data.isAdmin});
        return data;
    }).catch((err) => {
        console.log(err);
    });
}

const login = async (email,password) => {
    return await fetch(`${baseUrl}/login`,{
        method: "POST",
        body: JSON.stringify({
            email,password
        }),
        headers: {
            "Content-Type" : "application/json"
        },mode: "cors",credentials: 'include'
    }).then((res) => {
        
        return res.json();
    }).then((data) => {
        console.log(data);
        return data;
    }).catch((err) => {
        console.log(err);
    });
}


const blogManipulateReq = async(reqType,docId,listNo) => {
    fetch(`${baseUrl}/moveBlog?reqType=${reqType}&listNo=${listNo}&docId=${docId}`,{mode: "cors",credentials: 'include'}).then((res) => {
        return res.json();
    }).then((data) => {
        console.log(data);
    });
    if(store.getState().isAdmin){
        const userData = await getAllUsers(`${baseUrl}/getUsers`);
        adminStore.dispatch({type: 'SET_USERS',users: userData.users});
    }
}

const getAllUsers = async (url) => {
    let data = await fetch(url,{mode: "cors",credentials: 'include'})
        .then((res) => {
            return res.json();
        })
        .catch((err) => {
            console.log(err);
        });
    return data;
}

export  {checkForAuth, login,blogManipulateReq,getAllUsers };