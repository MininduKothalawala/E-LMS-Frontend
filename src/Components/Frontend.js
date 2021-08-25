import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Home from "./Home/Home";
import Sidebar from "./Dashboard_Navigations/Sidebar";
import Login from "./Login/Login";


class Frontend extends Component {

    componentDidMount() { }

    render() {
        return(
            <div>
                <Router>

                    <Switch>
                        <Route path="/" exact component={Home}/>
                        <Route path="/login" exact component={Login}/>

                        <Route path="/dashboard" exact component={Sidebar}/>

                        {/*<Route path="/user" exact component={GettAllUsers}/>*/}
                        {/*<Route path="/user/add" exact component={SignUp}/>*/}

                        {/*<Route path="/library" exact component={ViewLibrary}/>*/}
                        {/*<Route path="/library/add" exact component={AddResource}/>*/}

                        {/*<Route path="/notice" exact component={Notices}/>*/}
                        {/*<Route path="/addNotices" exact component={AddNotice}/>*/}
                        {/*<Route path="/noticeList" exact component={NoticeList}/>*/}

                        {/*<Route path="/addClassroom" exact component={AddClassroom}/>*/}
                        {/*<Route path="/classroom" exact component={ClassroomListAdmin}/>*/}
                        {/*<Route path="/teacherClassroomList" exact component={ClassroomListTeacher}/>*/}
                        {/*<Route path="/adminClassDetails/:id" exact component={ClassroomDetailsAdmin}/>*/}
                        {/*<Route path="/studentClassroomList" exact component={ClassroomListStudent}/>*/}
                        {/*<Route path="/adminClassDetails/:id" exact component={ClassroomDetailsAdmin}/>*/}
                        {/*<Route path="/updateClassDetails" exact component={ClassroomUpdate}/>*/}
                        {/*<Route path="/teacherClassDetails/:id" exact component={ClassroomDetailsTeacher}/>*/}

                    </Switch>

                </Router>

            </div>
        )
    }

}

export default Frontend;
