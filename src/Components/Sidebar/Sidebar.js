import React, {Component} from 'react';
import {
    CloseButton,
    Image,
    ListGroup,
    ListGroupItem,
    Offcanvas,
    OffcanvasBody, Tab, Tabs
} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
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
import "./Sidebar.css"
import {Link} from "react-router-dom";

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
        }
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
     * With the selection, sidebar will be closed
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
                user_icon: user_white
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
                user_icon: user_white
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
                user_icon: user_white
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
                user_icon: user_white
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
                user_icon: user_yellow
            })
        }

        this.handleSideBarClose()
    }

    /**
     * Sign out the user and redirect to home
     */
    logout = () => {
        alert("LOG OUT")
    }

    render() {

        const {
            show, dashboard, classroom, notice, library, user,
            dashboard_icon, classroom_icon, notice_icon, library_icon, user_icon
        } = this.state

        return (
            <div>
                <Offcanvas show={show}
                           onHide={this.handleSideBarClose}>
                    <OffcanvasBody>
                        <div className={"wrapper"}>
                            <div className={"sidebar-top"}>
                                <div className={"sidebar-top-image"}>
                                    <CloseButton onClick={this.handleSideBarClose} className={"sidebar-close"}/>
                                </div>
                            </div>
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

                {/*----------------- Main UI -----------------*/}
                <div>
                    {/*----------------- Secondary Navigation -----------------*/}
                    <div>
                        <div className={"secondary-nav"}>
                            {/*<ListGroup horizontal>*/}
                            {/*----------------- Hamburger menu button -----------------*/}
                            <button className={"hamburger-menu"} onClick={this.handleSideBarOpen}>
                                <FontAwesomeIcon icon={faBars}/>
                            </button>

                            {/*----------------- Secondary Nav buttons -----------------*/}
                            <Tabs defaultActiveKey="profile" variant={"pills"} className="mb-3">
                                <Tab eventKey="library" title="LIBRARY"/>
                                <Tab eventKey="resource" title="RESOURCE"/>
                            </Tabs>
                        </div>
                    </div>

                </div>

            </div>
        )
    }
}

export default Sidebar;