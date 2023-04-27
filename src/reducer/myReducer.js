
const initState = {
    authState: false,
    isAdmin: false,
    user: null,
    blogs: null,
    approvedBlogs: null,
    pendingBlogs: null,
    rejectedBlogs: null,
    menuState: false
}
 
const rootReducer = (state = initState,action) => {
    if(action.type === 'SET_AUTH_STATE'){
        return {
            ...state,
            authState: action.status,
            isAdmin: action.isAdmin,
            user: action.user
        }
    }
    if(action.type === 'SET_BLOGS'){
        return {
            ...state,
            blogs: action.blogs
        }
    }
    if(action.type === 'SET_APPROVED_BLOGS'){
        return {
            ...state,
            approvedBlogs: action.blogs
        }
    }
    if(action.type === 'SET_PENDING_BLOGS'){
        return {
            ...state,
            pendingBlogs: action.blogs
        }
    }
    if(action.type === 'SET_REJECTED_BLOGS'){
        return {
            ...state,
            rejectedBlogs: action.blogs
        }
    }
    if(action.type === 'SET_MENU_STATE'){
        return {
            ...state,
            menuState: action.menuState
        }
    }
    return state;
}

export default rootReducer;