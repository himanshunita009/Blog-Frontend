import './App.css';
import Footer from './Component/Footer/footer';
import Header from './Component/Header/header';
import { BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Blog from './Component/Blog/Blog';
import UserRegistration from './Component/Registration/UserReistration';
import UserLogin from './Component/Login/userLogin';
import UserDashboard from './Component/UserDashBoard/UserDashboard';
import React from 'react';
import Home from './Component/Home/home';
import Admin from './Component/Admin/admin';
import { adminStore } from "./index";
import { Provider } from "react-redux";
class App extends React.Component {
  render(){
  return (
    <Router >   
      <div className='main' >
          <Header  />
          <Routes>
            <Route exact path='/' element={<Home />}/>
            {['/blogs','/dashBoard/approvedBlogs','/dashBoard/pendingBlogs','/dashBoard/rejectedBlogs','/admin/:email/approvedBlogs','/admin/:email/pendingBlogs','/admin/:email/rejectedBlogs','/admin/approvedBlogs','/admin/pendingBlogs','/admin/rejectedBlogs'].map((path,index) => 
              <Route extact path={`${path}/:id`} key={index} element={<Blog index={index} />}/>       
            )}       
            <Route extact path='/registration' element={<UserRegistration />}/>       
            <Route extact path='/login' element={<UserLogin  /> }/>                   
            {['/dashBoard','/dashBoard/addBlogs','/dashBoard/approvedBlogs','/dashBoard/pendingBlogs','/dashBoard/rejectedBlogs'].map((path,index) => 
              <Route path={path} element={<UserDashboard activeElement={index} />}  key={index}/>
            )}
            {['/admin','/admin/users','/admin/:email/approvedBlogs','/admin/:email/pendingBlogs','/admin/:email/rejectedBlogs','/admin/approvedBlogs','/admin/pendingBlogs','/admin/rejectedBlogs' ].map((path,index) => (
                <Route eaxact path={path} element={<Provider store={ adminStore }>  <Admin activeElement={index+1} /> </Provider>} key={index} />
            ))}
          </Routes>
          <Footer text={'Designed & Developed By Er. Himanshu Seth'}  />
      </div>
    </Router>
  );
  }
}



export default App;
