import React, {Component} from 'react';
import {
    CloseButton, Col,
    Image,
    ListGroup,
    ListGroupItem,
    Nav,
    Row
} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link, withRouter} from "react-router-dom";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import dashboard_white from "../../Assets/dashboard.svg"
import classroom_white from "../../Assets/classroom.svg"
import notice_white from "../../Assets/notice.svg"
import library_white from "../../Assets/library.svg"
import user_white from "../../Assets/user.svg"
import dashboard_yellow from "../../Assets/dashboard-yellow.svg"
import classroom_yellow from "../../Assets/classroom-yellow.svg"
import notice_yellow from "../../Assets/notice-yellow.svg"
import library_yellow from "../../Assets/library-yellow.svg"
import user_yellow from "../../Assets/user-yellow.svg"
import logout from "../../Assets/logout.svg"
import "../../Stylesheets/Sidebar.css"
import AuthenticationService from "../Login/AuthenticationService";
import ViewLibrary from "../Library/ViewLibrary";
import Dashboard from "../Dashboard/Dashboard";
import ClassroomListAdmin from "../Classroom/Classroom-List-Admin";
import AddClassroom from "../Classroom/Add-Classroom";
import NoticeList from "../Notice/NoticeList";
import AddNotice from "../Notice/AddNotice";
import AddResource from "../Library/AddResource";
import GettAllUsers from "../User/GettAllUsers";
import SignUp from "../Login/Signup";
import ClassroomListTeacher from "../Classroom/Classroom-List-Teacher";
import ClassroomListStudent from "../Classroom/Classroom-List-Student";
import Notices from "../Notice/Notices";
import MainLibrary from "../Library/MainLibrary";

import ClassroomDetailsAdmin from "../Classroom/Classroom-Details-Admin";
import ClassroomDetailsTeacher from "../Classroom/Classroom-Details-Teacher";
import ClassroomUpdate from "../Classroom/Classroom-Update";
import ClassListAdmin from "../Classroom/Classroom-List-Admin";
import ClassroomDetailsStudent from "../Classroom/Classroom-Details-Student";

class Sidebar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: true,
            loadContent: 'dashboard',
            dashboard: true,  //default tab
            classroom: false,
            notice: false,
            library: false,
            user: false,
            dashboard_icon: dashboard_yellow,
            classroom_icon: classroom_white,
            notice_icon: notice_white,
            library_icon: library_white,
            user_icon: user_white,
            isUserLoggedIn: AuthenticationService.isUserLoggedIn(),
            loggedInUsername: AuthenticationService.loggedUserName(),
            loggedInUserRole: AuthenticationService.loggedUserRole()
        }
    }

    componentDidMount() {
    }

    /**
     * Side bar opening method
     */
    handleSideBarOpen = () => {
        this.setState({
            show: true
        })
    }

    /**
     * Side bar closing method
     */
    handleSideBarClose = () => {
        this.setState({
            show: false
        })
    }

    /**
     * This method change list item active state
     * and icon color when selected.
     * @param item - item you want to be active
     */
    listItemActive = (item) => {

        if (item === "dashboard") {
            this.setState({
                dashboard: true,
                classroom: false,
                notice: false,
                library: false,
                user: false,
                dashboard_icon: dashboard_yellow,
                classroom_icon: classroom_white,
                notice_icon: notice_white,
                library_icon: library_white,
                user_icon: user_white,
                loadContent: 'dashboard',
            })
        } else if (item === "classroom") {
            this.setState({
                dashboard: false,
                classroom: true,
                notice: false,
                library: false,
                user: false,
                dashboard_icon: dashboard_white,
                classroom_icon: classroom_yellow,
                notice_icon: notice_white,
                library_icon: library_white,
                user_icon: user_white,
                loadContent: 'classroom',
            })
        } else if (item === "notice") {
            this.setState({
                dashboard: false,
                classroom: false,
                notice: true,
                library: false,
                user: false,
                dashboard_icon: dashboard_white,
                classroom_icon: classroom_white,
                notice_icon: notice_yellow,
                library_icon: library_white,
                user_icon: user_white,
                loadContent: 'notice',
            })
        } else if (item === "library") {
            this.setState({
                dashboard: false,
                classroom: false,
                notice: false,
                library: true,
                user: false,
                dashboard_icon: dashboard_white,
                classroom_icon: classroom_white,
                notice_icon: notice_white,
                library_icon: library_yellow,
                user_icon: user_white,
                loadContent: 'library',
            })
        } else if (item === "user") {
            this.setState({
                dashboard: false,
                classroom: false,
                notice: false,
                library: false,
                user: true,
                dashboard_icon: dashboard_white,
                classroom_icon: classroom_white,
                notice_icon: notice_white,
                library_icon: library_white,
                user_icon: user_yellow,
                loadContent: 'user',
            })
        }

        // this.handleSideBarClose()
    }

    /**
     * This method change the is to change the loading
     * component for the relevant header.
     * @param content - which component to be displayed
     */
    loadContent = (content) => {
        this.setState({
            loadContent: content
        })
    }

    /**
     * Sign out the user and redirect to home
     */
    logout = () => {
        AuthenticationService.logout();
        this.props.history.push("/")
    }

    render() {
        const {
            dashboard,
            classroom,
            notice,
            library,
            user,
            dashboard_icon,
            classroom_icon,
            notice_icon,
            library_icon,
            user_icon,
            isUserLoggedIn,
            loggedInUsername,
            loadContent
        } = this.state

        const loggedUserRole = AuthenticationService.loggedUserRole();
        let loggedAsAdmin = false;
        let loggedAsTeacher = false;
        let loggedAsStudent = false;

        if (loggedUserRole != null && loggedUserRole === 'admin') {
            loggedAsAdmin = true;
        }
        if (loggedUserRole != null && loggedUserRole === 'teacher') {
            loggedAsTeacher = true;
        }
        if (loggedUserRole != null && loggedUserRole === 'student') {
            loggedAsStudent = true;
        }

        return (
            <div>
                {   isUserLoggedIn &&
                <div className={"div-admin-grid"}>
                    {/*------------------------------------------------- Sidebar Navigation -------------------------------------------------*/}
                    <div>
                        <div className={"wrapper"}>
                            <div className={"sidebar-top"}>
                                {/*----------------- Sidebar Logo Image and Close button -----------------*/}
                                {/*logo bg image has been added with css*/}
                                <div className={"sidebar-top-image"}>
                                    {/*<CloseButton onClick={this.handleSideBarClose} className={"sidebar-close"}/>*/}
                                </div>
                            </div>

                            {/*----------------- Sidebar Navigation Tabs -----------------*/}
                            <div className={"sidebar-middle"}>
                                <ListGroup variant="flush">
                                    { isUserLoggedIn &&
                                    <Link className={"dashboard-links"}>
                                        <ListGroupItem active={dashboard}
                                                       onClick={() => this.listItemActive("dashboard")}>
                                            <div className={"dashboard-icon"}>
                                                <Image src={dashboard_icon} className={"dash-svg-icon"}/>
                                                <div className={"icon-text"}>DASHBOARD</div>
                                            </div>
                                        </ListGroupItem>
                                    </Link>
                                    }

                                    <Link className={"dashboard-links"}>
                                        <ListGroupItem active={classroom}
                                                       onClick={() => this.listItemActive("classroom")}>
                                            <div className={"dashboard-icon"}>
                                                <Image src={classroom_icon} className={"dash-svg-icon"}/>
                                                <div className={"icon-text"}>CLASSROOM</div>
                                            </div>
                                        </ListGroupItem>
                                    </Link>

                                    <Link className={"dashboard-links"}>
                                        <ListGroupItem active={notice}
                                                       onClick={() => this.listItemActive("notice")}>
                                            <div className={"dashboard-icon"}>
                                                <Image src={notice_icon} className={"dash-svg-icon"}/>
                                                <div className={"icon-text"}>NOTICE</div>
                                            </div>
                                        </ListGroupItem>
                                    </Link>

                                    <Link className={"dashboard-links"}>
                                        <ListGroupItem active={library}
                                                       onClick={() => this.listItemActive("library")}>
                                            <div className={"dashboard-icon"}>
                                                <Image src={library_icon} className={"dash-svg-icon"}/>
                                                <div className={"icon-text"}>LIBRARY</div>
                                            </div>
                                        </ListGroupItem>
                                    </Link>

                                    { loggedAsAdmin &&
                                    <Link className={"dashboard-links"}>
                                        <ListGroupItem active={user}
                                                       onClick={() => this.listItemActive("user")}>
                                            <div className={"dashboard-icon"}>
                                                <Image src={user_icon} className={"dash-svg-icon"}/>
                                                <div className={"icon-text"}>USER</div>
                                            </div>
                                        </ListGroupItem>
                                    </Link>
                                    }
                                </ListGroup>
                            </div>

                            {/*----------------- Logout Tab -----------------*/}
                            <div className={"sidebar-bottom"}>
                                <div className={"logout-div"}>
                                    <div className={"dashboard-icon"} onClick={this.logout}>
                                        <Image src={logout} className={"dash-svg-icon"}/>
                                        <div className={"icon-text"}>SIGN OUT</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        {/*------------------------------------------------- Secondary Navigation Header -------------------------------------------------*/}
                        <div>
                            <div className={"secondary-nav"}>
                                <Row>
                                    <Col xxl={1} lg={3} md={3} sm={3} xs={3} className={"px-0"}>

                                        {/*----------------- Hamburger menu button - visible when the frame size is lower -----------------*/}
                                        {/*<button className={"hamburger-menu"} onClick={this.handleSideBarOpen}>*/}
                                        {/*    <FontAwesomeIcon icon={faBars}/>*/}
                                        {/*</button>*/}
                                    </Col>
                                    <Col className={"pl-0"}>

                                        {/*----------------- Secondary Nav buttons -----------------*/}
                                        {dashboard &&
                                        <Nav variant="pills" defaultActiveKey="board">
                                            <Nav.Item onClick={() => this.loadContent("dashboard")}>
                                                <Nav.Link eventKey="board">
                                                    <div className={"second-nav-item-link"}>DASHBOARD</div>
                                                </Nav.Link>
                                            </Nav.Item>
                                        </Nav>
                                        }

                                        {/*-------------------------------------------------------------------------------------*/}
                                        {classroom &&
                                        <Nav variant="pills" defaultActiveKey="classes">
                                            <Nav.Item onClick={() => this.loadContent("classroom")}>
                                                <Nav.Link eventKey="classes">
                                                    <div className={"second-nav-item-link"} >CLASSROOMS</div>
                                                </Nav.Link>
                                            </Nav.Item>
                                            { loggedAsTeacher &&
                                            <Nav.Item>
                                                <Nav.Link eventKey="add-class" onClick={() => this.loadContent("class-admin-add")}>
                                                    <div className={"second-nav-item-link"}>ADD CLASSROOM</div>
                                                </Nav.Link>
                                            </Nav.Item>
                                            }
                                        </Nav>
                                        }

                                        {/*-------------------------------------------------------------------------------------*/}
                                        {notice &&
                                        <Nav variant="pills" defaultActiveKey="notices">
                                            <Nav.Item onClick={() => this.loadContent("notice")}>
                                                <Nav.Link eventKey="notices">
                                                    <div className={"second-nav-item-link"}>NOTICES</div>
                                                </Nav.Link>
                                            </Nav.Item>
                                            { loggedAsAdmin &&
                                            <Nav.Item onClick={() => this.loadContent("notice-admin-add")}>
                                                <Nav.Link eventKey="add-notice">
                                                    <div className={"second-nav-item-link"}>ADD NOTICE</div>
                                                </Nav.Link>
                                            </Nav.Item>
                                            }

                                        </Nav>
                                        }

                                        {/*-------------------------------------------------------------------------------------*/}
                                        {library &&
                                        <Nav variant="pills" defaultActiveKey="library">
                                            <Nav.Item onClick={() => this.loadContent("library")}>
                                                <Nav.Link eventKey="library">
                                                    <div className={"second-nav-item-link"}>LIBRARIES</div>
                                                </Nav.Link>
                                            </Nav.Item>
                                            { loggedAsAdmin &&
                                            <Nav.Item onClick={() => this.loadContent("library-admin-add")}>
                                                <Nav.Link eventKey="add-library">
                                                    <div className={"second-nav-item-link"}>ADD RESOURCES</div>
                                                </Nav.Link>
                                            </Nav.Item>
                                            }
                                        </Nav>
                                        }

                                        {/*-------------------------------------------------------------------------------------*/}
                                        {user &&
                                        <Nav variant="pills" defaultActiveKey="user">
                                            <Nav.Item onClick={() => this.loadContent("user")}>
                                                <Nav.Link eventKey="user">
                                                    <div className={"second-nav-item-link"}>USERS</div>
                                                </Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item onClick={() => this.loadContent("user-admin-add")}>
                                                <Nav.Link eventKey="add-user">
                                                    <div className={"second-nav-item-link"}>ADD USER</div>
                                                </Nav.Link>
                                            </Nav.Item>
                                        </Nav>
                                        }
                                    </Col>
                                    <Col xxl={2} lg={2} md={3} sm={5} xs={4} className={"pt-2 text-end"}>
                                        <h6 className={"pt-1"}>Hi, {loggedInUsername}</h6>
                                    </Col>

                                </Row>

                            </div>

                        </div>

                        {/*------------------------------------------------------------- Content ------------------------------------------------------------*/}
                        <div className={"main-content"}>
                            <div>
                                {/*------------------------------------------ DASHBOARD -------------------------------------------*/}

                                {/*********************** ADMIN ***********************/}
                                { loggedAsAdmin && loadContent === 'dashboard' &&
                                <div>
                                    <Dashboard />
                                </div>
                                }
                                {/*******************************************************/}


                                {/*********************** TEACHER ***********************/}
                                { loggedAsTeacher && loadContent === 'dashboard' &&
                                <div>
                                    <Dashboard />
                                </div>
                                }

                                {/*******************************************************/}


                                {/*********************** STUDENT ***********************/}
                                { loggedAsStudent && loadContent === 'dashboard' &&
                                <div>
                                    <Dashboard />
                                </div>
                                }

                                {/*******************************************************/}
                                {/*--------------------------------------------------------------------------------------------*/}


                                {/*---------------------------------------- CLASSROOM -----------------------------------------*/}

                                {/*********************** ADMIN ***********************/}
                                { loggedAsAdmin && loadContent === 'classroom' &&
                                <div>
                                    <ClassroomListAdmin />
                                </div>
                                }
                                { loadContent === 'class-admin-add' &&
                                <div>
                                    <AddClassroom />
                                </div>
                                }
                                {/*******************************************************/}


                                {/*********************** TEACHER ***********************/}
                                { loggedAsTeacher && loadContent === 'classroom' &&
                                <div>
                                    <ClassroomListTeacher />
                                </div>
                                }

                                {/*******************************************************/}


                                {/*********************** STUDENT ***********************/}
                                { loggedAsStudent && loadContent === 'classroom' &&
                                <div>
                                    <ClassroomListStudent />
                                </div>
                                }

                                {/*******************************************************/}
                                {/*--------------------------------------------------------------------------------------------*/}


                                {/*------------------------------------------ NOTICE -------------------------------------------*/}

                                {/*********************** ADMIN ***********************/}
                                { loggedAsAdmin && loadContent === 'notice' &&
                                <div>
                                    <NoticeList />
                                </div>
                                }
                                { loadContent === 'notice-admin-add' &&
                                <div>
                                    <AddNotice />
                                </div>
                                }
                                {/*******************************************************/}


                                {/*********************** TEACHER ***********************/}
                                { loggedAsTeacher && loadContent === 'notice' &&
                                <div>
                                    <Notices />
                                </div>
                                }

                                {/*******************************************************/}


                                {/*********************** STUDENT ***********************/}
                                { loggedAsStudent && loadContent === 'notice' &&
                                <div>
                                    <Notices />
                                </div>
                                }

                                {/*******************************************************/}
                                {/*--------------------------------------------------------------------------------------------*/}


                                {/*------------------------------------------ LIBRARY -------------------------------------------*/}

                                {/*********************** ADMIN ***********************/}
                                { loggedAsAdmin && loadContent === 'library' &&
                                <div>
                                    <ViewLibrary />
                                </div>
                                }
                                { loadContent === 'library-admin-add' &&
                                <div>
                                    <AddResource />
                                </div>
                                }
                                {/*******************************************************/}


                                {/*********************** TEACHER ***********************/}
                                { loggedAsTeacher && loadContent === 'library' &&
                                <div>
                                    <MainLibrary />
                                </div>
                                }

                                {/*******************************************************/}


                                {/*********************** STUDENT ***********************/}
                                { loggedAsStudent && loadContent === 'library' &&
                                <div>
                                    <MainLibrary />
                                </div>
                                }

                                {/*******************************************************/}
                                {/*--------------------------------------------------------------------------------------------*/}


                                {/*------------------------------------------ USER -------------------------------------------*/}

                                {/*********************** ADMIN ***********************/}
                                { loadContent === 'user' &&
                                <div>
                                    <GettAllUsers />
                                </div>
                                }
                                { loadContent === 'user-admin-add' &&
                                <div>
                                    <SignUp />
                                </div>
                                }
                                {/*******************************************************/}
                                {/*--------------------------------------------------------------------------------------------*/}

                            </div>
                        </div>
                    </div>
                </div>
                }
            </div>

        )
    }
}

export default withRouter(Sidebar);
