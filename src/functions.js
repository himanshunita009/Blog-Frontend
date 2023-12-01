import { adminStore, store } from "./index";
const checkForAuth = async () => {
    return await fetch('/checkAuth',{mode: "cors",credentials: 'same-origin'}).then((res) => {
        return res.json();
    }).then((data)=> { 
        store.dispatch({type: 'SET_AUTH_STATE',status: data.status,user: data.user,isAdmin: data.isAdmin});
        return data;
    }).catch((err) => {
        console.log(err);
    });
}

const login = async (email,password) => {
    return await fetch('/login',{
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
        return data;
    }).catch((err) => {
        console.log(err);
    });
} 


const blogManipulateReq = async(reqType,docId,listNo) => {
    fetch(`/moveBlog?reqType=${reqType}&listNo=${listNo}&docId=${docId}`,{mode: "cors",credentials: 'include'}).then((res) => {
        return res.json();
    });
    if(store.getState().isAdmin){
        const userData = await getAllUsers('/getUsers');
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