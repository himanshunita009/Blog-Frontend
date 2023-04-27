import React from 'react';
import BlogList from '../BlogList/BlogList';
import './home.css';
import { connect } from "react-redux";
import { getBlogsList } from '../BlogList/getBlogsListFetch';
class Home extends React.Component {  
    componentDidMount(){
        if(!this.props.blogs){
            getBlogsList(1,'null',0).then(() => {
                console.log(this.props.blogs);
            });
        }
    }
    render(){
        return(
            <div className="home-main">
                {this.props.blogs && <BlogList blogsData={this.props.blogs} path="/blogs" />}        
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs
    }
}
export default connect(mapStateToProps)(Home);