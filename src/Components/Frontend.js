import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Home from "./Home/Home";
import Sidebar from "./SideBar/Sidebar";
import ViewLibrary from "./Library/ViewLibrary";
import Dashboard from "./Dashboard/Dashboard";
import ClassroomMain from "./Classroom/ClassroomMain";
import Notices from "./Notice/Notices";
import Users from "./User/Users";
import AddNotice from "./Notice/AddNotice";
import NoticeList from "./Notice/NoticeList";

import AddClassroom from "./Classroom/Add-Classroom";

import ClassroomListAdmin from "./Classroom/Classroom-List-Admin";
import ClassroomListTeacher from "./Classroom/Classroom-List-Teacher";
import ClassroomDetailsAdmin from "./Classroom/Classroom-Details-Admin";
import ClassroomDetailsTeacher from "./Classroom/Classroom-Details-Teacher";
import ClassroomUpdate from "./Classroom/Classroom-Update";

import ClassListAdmin from "./Classroom/Class-List-Admin";


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
                        <Route path="/classroom" exact component={ClassroomMain}/>
                        <Route path="/library" exact component={ViewLibrary}/>
                        <Route path="/notice" exact component={Notices}/>
                        <Route path="/addNotices" exact component={AddNotice}/>
                        <Route path="/noticeList" exact component={NoticeList}/>
                        <Route path="/addClassroom" exact component={AddClassroom}/>
                        <Route path="/adminClassDetails/:id"  component={ClassroomDetailsAdmin}/>

                        <Route path="/adminClassroomList" exact component={ClassroomListAdmin}/>
                        <Route path="/teacherClassroomList" exact component={ClassroomListTeacher}/>
                        <Route path="/adminClassDetails/:id" exact component={ClassroomDetailsAdmin}/>
                        <Route path="/updateClassDetails" exact component={ClassroomUpdate}/>
                        <Route path="/teacherClassDetails/:id" exact component={ClassroomDetailsTeacher}/>
                        <Route path="/classListAdmin" exact component={ClassListAdmin}/>

                    </Switch>

                </Router>



            </div>
        )
    }

}

export default Frontend;
