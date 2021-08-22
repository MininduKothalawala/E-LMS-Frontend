import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Home from "./Home/Home";
import Sidebar from "./Dashboard_Navigations/Sidebar";
import ViewLibrary from "./Library/ViewLibrary";
import Dashboard from "./Dashboard/Dashboard";
import Classroom from "./Classroom/Classroom";
import Notices from "./Notice/Notices";
import Login from "./Login/Login";
import AddNotice from "./Notice/AddNotice";
import NoticeList from "./Notice/NoticeList";
import AddResource from "./Library/AddResource";
import SignUp from "./Login/Signup";
import GettAllUsers from "./User/GettAllUsers";

class Frontend extends Component {

    componentDidMount() {
        console.log(window.location.pathname)
    }

    render() {
        return(
            <div>
                <Router>

                    {/* Sidebar will not appear for home, login and register */}
                    {
                        window.location.pathname !== '/' &&
                        window.location.pathname !== '/login' &&
                        window.location.pathname !== '/register' &&
                        <Sidebar/>
                     }

                    <Switch>
                        <Route path="/" exact component={Home}/>
                        <Route path="/login" exact component={Login}/>
                        <Route path="/dashboard" exact component={Dashboard}/>

                        <Route path="/user" exact component={GettAllUsers}/>
                        <Route path="/user/add" exact component={SignUp}/>

                        <Route path="/classroom" exact component={Classroom}/>

                        <Route path="/library" exact component={ViewLibrary}/>
                        <Route path="/library/add" exact component={AddResource}/>

                        <Route path="/notice" exact component={Notices}/>
                        <Route path="/addNotices" exact component={AddNotice}/>
                        <Route path="/noticeList" exact component={NoticeList}/>
                    </Switch>

                </Router>



            </div>
        )
    }

}

export default Frontend;
