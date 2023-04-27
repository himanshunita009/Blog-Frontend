import React from 'react';
import { Link } from 'react-router-dom';
import './navPan.css';
import { connect } from "react-redux";
const adminPanel = [
    {
        icon: "admin",
        name: "Admin",
        link: ''
    },{
        icon: "users",
        name: "All Users",
        link: '/users'
    },{
        icon: "recommend",
        name: "Approved Blogs",
        link: '/approvedBlogs'
    },{
        icon: "pending_actions",
        name: "Pending Blogs",
        link: '/pendingBlogs'
    },{
        icon: "thumb_down_alt",
        name: "Rejected Blogs",
        link: '/rejectedBlogs'
    }
];
const userPanel = [
    {
        icon: "dashboard",
        name: "Dashboard",
        link: ''
    },{
        icon: "post_add",
        name: "Add New Blogs",
        link: '/addBlogs'
    },{
        icon: "recommend",
        name: "Approved Blogs",
        link: '/approvedBlogs'
    },{
        icon: "pending_actions",
        name: "Pending Blogs",
        link: '/pendingBlogs'
    },{
        icon: "thumb_down_alt",
        name: "Rejected Blogs",
        link: '/rejectedBlogs'
    }
];
class NavPan extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            navChildElements: props.isAdmin?adminPanel:userPanel
        }
    }
    componentDidUpdate(prevProps){
        if(prevProps.isAdmin !== this.props.isAdmin){
            this.setState({
                navChildElements: this.props.isAdmin?adminPanel:userPanel
            })
        }
    }
    render() {
        return (
             <div className="navpan-back">
                {this.props.authState && this.props.menuState && <span className="material-icons" 
                    onClick={()=> this.props.setMenuState(!this.props.menuState)}
                >cancel</span>}
                {this.props.menuState && this.state.navChildElements.map((element,index) => (
                    
                    <Link className='navpan-child' key={index} to={`/${this.props.isAdmin?'admin':'dashboard'}${element.link}`}>
                        <span className="material-icons">{element.icon}</span>
                        <span className="name">&nbsp;&nbsp;{element.name}</span>
                    </Link>
                ))}
             </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        authState: state.authState,
        menuState: state.menuState,
        isAdmin: state.isAdmin
    }
}
const mapDispatchToPorps = (dispatch) => {
    return {
        setMenuState: (menuState) => {dispatch({type: 'SET_MENU_STATE',menuState: menuState})}
    }
}

export default connect(mapStateToProps,mapDispatchToPorps)(NavPan);