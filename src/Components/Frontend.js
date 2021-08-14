import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Home from "./Home/Home";
import Sidebar from "./SideBar/Sidebar";
import ViewLibrary from "./Library/ViewLibrary";
import Dashboard from "./Dashboard/Dashboard";
import Classroom from "./Classroom/Classroom";
import Notices from "./Notice/Notices";
import Users from "./User/Users";

class Frontend extends Component {
    // constructor(props) {
    //     super(props);
    // }

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
                        <Route path="/dashboard" exact component={Dashboard}/>

                        <Route path="/user" exact component={Users}/>
                        <Route path="/classroom" exact component={Classroom}/>
                        <Route path="/library" exact component={ViewLibrary}/>
                        <Route path="/notice" exact component={Notices}/>
                    </Switch>

                </Router>



            </div>
        )
    }

}

export default Frontend;
