import React, {Component} from 'react';
import {
    CloseButton, Col,
    Image,
    ListGroup,
    ListGroupItem, Nav,
    Offcanvas,
    OffcanvasBody, Row
} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";
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

class Sidebar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: true,
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
            pathname: window.location.pathname,
        }
    }

    componentDidMount() {
        this.setState({
            pathname: window.location.pathname
        })
        this.listItemActive()
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
     * With the selection, sidebar will be closed TODO
     * @param item - item you want to be active
     */
    listItemActive = (item) => {
        let pathname = this.state.pathname

        if (item === "dashboard" || pathname === "dashboard" ) {
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
                user_icon: user_white
            })
        } else if (item === "classroom" || pathname === "classroom") {
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
                user_icon: user_white
            })
        } else if (item === "notice" || pathname === "notice") {
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
                user_icon: user_white
            })
        } else if (item === "library" || pathname === "library") {
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
                user_icon: user_white
            })
        } else if (item === "user" || pathname === "user") {
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
                user_icon: user_yellow
            })
        }

        // this.handleSideBarClose()
    }

    /**
     * This method change the secondary header content
     * and helps load the relevant components.
     * @param content - which content you want to access
     */
    // loadContent = (content) => {
    //     if (content === "dashboard") {
    //         this.setState({
    //             dashboard: true,
    //             classroom: false,
    //             notice: false,
    //             library: false,
    //             user: false,
    //             dashboard_icon: dashboard_yellow,
    //             classroom_icon: classroom_white,
    //             notice_icon: notice_white,
    //             library_icon: library_white,
    //             user_icon: user_white
    //         })
    //     } else if (content === "classroom") {
    //         this.setState({
    //             dashboard: false,
    //             classroom: true,
    //             notice: false,
    //             library: false,
    //             user: false,
    //             dashboard_icon: dashboard_white,
    //             classroom_icon: classroom_yellow,
    //             notice_icon: notice_white,
    //             library_icon: library_white,
    //             user_icon: user_white
    //         })
    //     } else if (content === "notice") {
    //         this.setState({
    //             dashboard: false,
    //             classroom: false,
    //             notice: true,
    //             library: false,
    //             user: false,
    //             dashboard_icon: dashboard_white,
    //             classroom_icon: classroom_white,
    //             notice_icon: notice_yellow,
    //             library_icon: library_white,
    //             user_icon: user_white
    //         })
    //     } else if (content === "library") {
    //         this.setState({
    //             dashboard: false,
    //             classroom: false,
    //             notice: false,
    //             library: true,
    //             user: false,
    //             dashboard_icon: dashboard_white,
    //             classroom_icon: classroom_white,
    //             notice_icon: notice_white,
    //             library_icon: library_yellow,
    //             user_icon: user_white
    //         })
    //     } else if (content === "user") {
    //         this.setState({
    //             dashboard: false,
    //             classroom: false,
    //             notice: false,
    //             library: false,
    //             user: true,
    //             dashboard_icon: dashboard_white,
    //             classroom_icon: classroom_white,
    //             notice_icon: notice_white,
    //             library_icon: library_white,
    //             user_icon: user_yellow
    //         })
    //     }
    // }

    /**
     * Sign out the user and redirect to home
     */
    logout = () => {
        window.location.href = "/";
    }

    render() {
        const {
            show, dashboard, classroom, notice, library, user,
            dashboard_icon, classroom_icon, notice_icon, library_icon, user_icon
        } = this.state

        return (
            <div>
                {/*TODO: Include user level access*/}
                {/*------------------------------------------------- Sidebar Start -------------------------------------------------*/}
                <Offcanvas show={show}
                           onHide={this.handleSideBarClose}>
                    <OffcanvasBody>
                        <div className={"wrapper"}>
                            <div className={"sidebar-top"}>
                                {/*----------------- Sidebar Logo Image and Close button -----------------*/}
                                {/*logo bg image has been added with css*/}
                                <div className={"sidebar-top-image"}>
                                    <CloseButton onClick={this.handleSideBarClose} className={"sidebar-close"}/>
                                </div>
                            </div>

                            {/*----------------- Sidebar Navigation Tabs -----------------*/}
                            <div className={"sidebar-middle"}>
                                <ListGroup variant="flush">
                                    <Link to="/dashboard" className={"dashboard-links"}>
                                        <ListGroupItem href="/dashboard" active={dashboard}
                                                       onClick={() => this.listItemActive("dashboard")}>
                                            <div className={"dashboard-icon"}>
                                                <Image src={dashboard_icon} className={"dash-svg-icon"}/>
                                                <div className={"icon-text"}>DASHBOARD</div>
                                            </div>
                                        </ListGroupItem>
                                    </Link>

                                    <Link to="/classroom" className={"dashboard-links"}>
                                        <ListGroupItem active={classroom}
                                                       onClick={() => this.listItemActive("classroom")}>
                                            <div className={"dashboard-icon"}>
                                                <Image src={classroom_icon} className={"dash-svg-icon"}/>
                                                <div className={"icon-text"}>CLASSROOM</div>
                                            </div>
                                        </ListGroupItem>
                                    </Link>

                                    <Link to="/notice" className={"dashboard-links"}>
                                        <ListGroupItem active={notice}
                                                       onClick={() => this.listItemActive("notice")}>
                                            <div className={"dashboard-icon"}>
                                                <Image src={notice_icon} className={"dash-svg-icon"}/>
                                                <div className={"icon-text"}>NOTICE</div>
                                            </div>
                                        </ListGroupItem>
                                    </Link>

                                    <Link to="/library" className={"dashboard-links"}>
                                        <ListGroupItem active={library}
                                                       onClick={() => this.listItemActive("library")}>
                                            <div className={"dashboard-icon"}>
                                                <Image src={library_icon} className={"dash-svg-icon"}/>
                                                <div className={"icon-text"}>LIBRARY</div>
                                            </div>
                                        </ListGroupItem>
                                    </Link>

                                    <Link to="/user" className={"dashboard-links"}>
                                        <ListGroupItem active={user}
                                                       onClick={() => this.listItemActive("user")}>
                                            <div className={"dashboard-icon"}>
                                                <Image src={user_icon} className={"dash-svg-icon"}/>
                                                <div className={"icon-text"}>USER</div>
                                            </div>
                                        </ListGroupItem>
                                    </Link>
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
                    </OffcanvasBody>
                </Offcanvas>
                {/*------------------------------------------------- Sidebar End -------------------------------------------------*/}


                {/*------------------------------------------------- Secondary Navigation Header -------------------------------------------------*/}
                <div>
                    <div className={"secondary-nav"}>
                        <Row className={"px-5"}>
                            <Col xxl={1} lg={3} md={3} sm={3} xs={3} className={"px-0"}>

                                {/*----------------- Hamburger menu button -----------------*/}
                                <button className={"hamburger-menu"} onClick={this.handleSideBarOpen}>
                                    <FontAwesomeIcon icon={faBars}/>
                                </button>
                            </Col>
                            <Col>

                                {/*----------------- Secondary Nav buttons -----------------*/}
                                {dashboard &&
                                <Nav variant="pills" defaultActiveKey="board">
                                    <Nav.Item>
                                        <Nav.Link eventKey="board">
                                            <Link to="/dashboard" className={"second-nav-item-link"}>DASHBOARD</Link>
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                                }

                                {/*-------------------------------------------------------------------------------------*/}
                                {classroom &&
                                <Nav variant="pills" defaultActiveKey="classes">
                                    <Nav.Item>
                                        <Nav.Link eventKey="classes">
                                            <Link to="/classroom" className={"second-nav-item-link"}>CLASSES</Link>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="add-class">
                                            <Link to="/class/add" className={"second-nav-item-link"}>ADD CLASS</Link>
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                                }

                                {/*-------------------------------------------------------------------------------------*/}
                                {notice &&
                                <Nav variant="pills" defaultActiveKey="notices">
                                    <Nav.Item>
                                        <Nav.Link eventKey="notices">
                                            <Link to="/noticeList" className={"second-nav-item-link"}>NOTICES</Link>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="add-notice">
                                            <Link to="/addNotices" className={"second-nav-item-link"}>ADD NOTICE</Link>
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                                }

                                {/*-------------------------------------------------------------------------------------*/}
                                {library &&
                                <Nav variant="pills" defaultActiveKey="library">
                                    <Nav.Item>
                                        <Nav.Link eventKey="library">
                                            <Link to="/library" className={"second-nav-item-link"}>LIBRARIES</Link>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="add-library">
                                            <Link to="/library/add" className={"second-nav-item-link"}>ADD
                                                RESOURCES</Link>
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                                }

                                {/*-------------------------------------------------------------------------------------*/}
                                {user &&
                                <Nav variant="pills" defaultActiveKey="user">
                                    <Nav.Item>
                                        <Nav.Link eventKey="user">
                                            <Link to="/user" className={"second-nav-item-link"}>USERS</Link>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="add-user">
                                            <Link to="/user/add" className={"second-nav-item-link"}>ADD USER</Link>
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                                }
                            </Col>
                            <Col xxl={2} lg={2} md={3} sm={5} xs={4} className={"pt-2 text-end "}>
                                <h6 className={"pt-1"}>Hi, user451531</h6>
                            </Col>

                        </Row>

                    </div>

                </div>

            </div>
        )
    }
}

export default Sidebar;