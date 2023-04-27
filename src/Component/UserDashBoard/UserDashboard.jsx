import React from 'react';
import { blogManipulateReq, checkForAuth } from '../../functions';
import AddBlogs from './addBlogs';
import BlogList from "../BlogList/BlogList";
import './userDashboard.css';
import { store } from '../../index';
import { connect } from "react-redux";
import { getBlogsList } from '../BlogList/getBlogsListFetch';
import withRouter from '../../withRouterFn';
const DashBoard = ({user}) => {
    return (
        <div className="dashboard-back">
            <span>Welcome {user.name}</span><br />
            <span>{user.email}</span><br />
            <span>{user.occupation}</span><br />
            <span>{user.contribution.approved}</span><br />
            <span>{user.contribution.pending}</span><br />
            <span>{user.contribution.rejected}</span>
        </div>
    );
};

class UserDashboard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user: null,
            blogs: null
        }
        this.handleReq = this.handleReq.bind(this);
        this.loadData = this.loadData.bind(this);
    } 
    componentDidMount(){
        checkForAuth().then(async(res) => {
            if(!res.status){
                window.alert('you are not authorised');
                //window.location.assign('/login');
            }else {
                store.dispatch({type: 'SET_AUTH_STATE',status: res.status,user: res.user,isAdmin: res.isAdmin})
                this.setState({
                    user: res.user
                });
                if(res.isAdmin)
                    window.location.assign('/admin');
                if(this.props.activeElement >= 2 && this.props.activeElement <= 4 && !res.isAdmin){
                    getBlogsList(this.props.activeElement-1,this.props.user.email,0).then(() => {
                        if(this.props.activeElement === 2){
                            this.setState({
                                blogs: this.props.approvedBlogs
                            });
                        }
                        else if (this.props.activeElement === 3){
                            this.setState({
                                blogs: this.props.pendingBlogs
                            });
                        }
                        else if (this.props.activeElement === 4){
                            this.setState({
                                blogs: this.props.rejectedBlogs
                            });
                        }
                    });
                }
            }
        });
    }
    loadData(){
        getBlogsList(this.props.activeElement-1,this.props.user.email,0).then(() => {
            if(this.props.activeElement === 2){
                this.setState({
                    blogs: this.props.approvedBlogs
                });
            }
            else if (this.props.activeElement === 3){
                this.setState({
                    blogs: this.props.pendingBlogs
                });
            }
            else if (this.props.activeElement === 4){
                this.setState({
                    blogs: this.props.rejectedBlogs
                });
            }
        });
    }
    componentDidUpdate(nextProps){
        if( this.props.activeElement !== nextProps.activeElement && this.props.activeElement >= 2 && this.props.activeElement <= 4){
            if(this.props.activeElement === 2 && this.props.approvedBlogs)
                this.setState({
                    blogs: this.props.approvedBlogs
                });
            else if(this.props.activeElement === 3 && this.props.pendingBlogs)
                this.setState({
                    blogs: this.props.pendingBlogs
                });
            else if(this.props.activeElement === 4 && this.props.rejectedBlogs)
                this.setState({
                    blogs: this.props.rejectedBlogs
                });
            else 
                this.loadData();
        }
    }
    async handleReq(reqType,docId) {
        let listNo;
        if(this.props.activeElement >= 2 && this.props.activeElement <= 4){
            listNo = this.props.activeElement-1;
        }
        this.setState({
            blogs: null
        });
        await blogManipulateReq(reqType,docId,listNo);
        this.loadData();
    }
    render(){
        return (
            <div className='dashboard-back'>
                {this.props.activeElement === 0 && !this.state.user && <div>Loading...</div>}
                {this.props.activeElement === 0 && this.state.user && <DashBoard user={this.state.user} />}
                {this.props.activeElement === 1 && !this.state.user && <div>Loading...</div>}
                {this.props.activeElement === 1 && this.state.user && <AddBlogs email={this.props.user.email} />}
                {this.props.activeElement === 2  &&  
                    <BlogList 
                        handleReq={this.handleReq} 
                        blogsData={this.state.blogs} 
                        path={this.props.router.location.pathname} 
                        deleteBut={true}
                    />
                }
                {this.props.activeElement === 3  &&  
                    <BlogList 
                        handleReq={this.handleReq} 
                        blogsData={this.state.blogs} 
                        path={this.props.router.location.pathname} 
                        deleteBut={true}
                    />
                }
                {this.props.activeElement === 4  &&  
                    <BlogList handleReq={this.handleReq} blogsData={this.state.blogs} path={this.props.router.location.pathname} 
                        deleteBut={true}
                    />
                }
            </div>
        )   
    }
}

const mapStateToProps = (state) => {
    return {
        authState: state.authState,
        user: state.user,
        blogs: state.blogs,
        approvedBlogs: state.approvedBlogs,
        pendingBlogs: state.pendingBlogs,
        rejectedBlogs: state.rejectedBlogs

    }
}


export default connect(mapStateToProps)(withRouter(UserDashboard));