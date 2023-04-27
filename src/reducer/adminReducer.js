const initAdmindata = {
    admin: null,
    users: null
}


const adminReducer = (state = initAdmindata,action) => {
    if(action.type === 'SET_ADMIN'){
        return {
            ...state,
            admin: action.adminData
        }
    }
    if(action.type === 'SET_USERS'){
        return {
            ...state,
            users: action.usersData
        }
    }
    return state;
}

export default adminReducer;