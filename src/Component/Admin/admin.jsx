import React from "react";
import { blogManipulateReq, checkForAuth, getAllUsers } from "../../functions";
import { connect } from "react-redux";
import UserCard from "./userCard";
import './admin.css';
import { getBlogsList } from "../BlogList/getBlogsListFetch";
import BlogList from "../BlogList/BlogList";
import withRouter from "../../withRouterFn";
import { Grid } from "@mui/material";
import { baseUrl } from "../../index";
class Admin extends  React.Component {
    constructor(props) {
        super(props);
        this.loadData = this.loadData.bind(this);
        this.state = {
            blogs: null,
            noOfusers: 0,
            approvedBlogs: 0,
            pendingBlogs: 0,
            rejectedBlogs: 0
        }
        this.handleReq = this.handleReq.bind(this);
    }
    
    async handleReq(reqType,docId) {
        let listNo;
        if(this.props.activeElement >= 3 && this.props.activeElement <= 5){
            listNo = this.props.activeElement-2;
        }
        if(this.props.activeElement >= 6 && this.props.activeElement <= 8){
            listNo = this.props.activeElement-5;
        }
        console.log(reqType,docId,listNo);
        this.setState({
            blogs: null
        });
        await blogManipulateReq(reqType,docId,listNo);
        this.loadData(this.props.activeElement,this.props.router.params.email);
    }
    componentDidMount(){
        
        if(!this.props.adminData)
        checkForAuth().then(async (res) => {
            if(!res.status){
                alert('you are not authorised');
                window.location.assign('/login');
            }
            if(res.status && !res.isAdmin){
                alert('restricted area');
                window.location.assign('/dashboard');
            }else { 
                this.props.setAdminData(res.user);
                const userData = await getAllUsers(`${baseUrl}/getUsers`);
                this.props.setUsersData(userData.users);
            } 
            
        });
        this.loadData(this.props.activeElement,this.props.router.params.email);
    }   
    async loadData(listNo,email){
        console.log('load data');
        if(this.props.activeElement >= 3 && this.props.activeElement <= 5)
            listNo -= 2;
        if(this.props.activeElement >= 6 && this.props.activeElement <= 8)
            listNo -= 5;
        this.setState({
            blogs: null
        });
        const res = await getBlogsList(listNo,email===undefined?'null':email,0);
        this.setState({
            blogs: res.body
        });
        
    }
    componentDidUpdate(prevProps){
        if(prevProps.activeElement !== this.props.activeElement && this.props.activeElement >= 2){
            
            this.loadData(this.props.activeElement,this.props.router.params.email);
        }
    }
    render() {
        
        return (
          <div className="admin-back">
            {this.props.activeElement === 1 && !this.props.adminData && <div>Loading...</div>}
            {this.props.activeElement === 1 && this.props.adminData && <div>Hello Admin</div>}
            <Grid container padding={2} spacing={2} justifyContent='center'>
                {this.props.activeElement === 2 && this.props.users && this.props.users.map((user,index) => (
                    <Grid item key={index} xs={12} sm={6} md={3}>
                        <UserCard user={user}  loadData={this.loadData} />
                    </Grid>
                ))}
                
            </Grid>
            {this.props.activeElement === 3  && 
                <BlogList 
                    handleReq={this.handleReq} 
                    blogsData={this.state.blogs} 
                    path={`/admin/${this.props.router.params.email}/approvedBlogs`} 
                    
                />
            }
            {this.props.activeElement === 4  && 
                <BlogList 
                    handleReq={this.handleReq} 
                    blogsData={this.state.blogs} 
                    approveBut={true}
                    rejectBut={true}   
                    path={`/admin/${this.props.router.params.email}/pendingBlogs`} 
                />
            }
            {this.props.activeElement === 5  && 
                <BlogList 
                    handleReq={this.handleReq} 
                    blogsData={this.state.blogs} 
                    path={`/admin/${this.props.router.params.email}/rejectedBlogs`} 
                    approveBut={true}
                    deleteBut={true}
                />
            }
            {this.props.activeElement === 6  && 
                <BlogList 
                    handleReq={this.handleReq} 
                    blogsData={this.state.blogs} 
                    path={`/admin/approvedBlogs`} 
                    rejectBut={true}
                />
            }
            {this.props.activeElement === 7  && 
                <BlogList 
                    handleReq={this.handleReq} 
                    blogsData={this.state.blogs} 
                    path={`/admin/pendingBlogs`} 
                    approveBut={true}
                    rejectBut={true}               
                />
            }
            {this.props.activeElement === 8  && 
                <BlogList 
                    handleReq={this.handleReq} 
                    blogsData={this.state.blogs} 
                    path={`/admin/rejectedBlogs`}
                    approveBut={true}
                    deleteBut={true}
                />
            }
          </div>
        );
    }
}

const mapStateToPops = (state) => {
    return {
        adminData: state.admin,
        users : state.users
    }
}

 

const mapDispatchToProps = (dispatch) => {
    return {
        setAdminData: (adminData) => {dispatch({type: 'SET_ADMIN',adminData: adminData})},
        setUsersData: (usersData) => {dispatch({type: 'SET_USERS',usersData: usersData})}
    }
}

export default connect(mapStateToPops,mapDispatchToProps)(withRouter(Admin));