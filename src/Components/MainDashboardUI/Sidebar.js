import React, {Component} from 'react';
import {Button, CloseButton, Image, ListGroup, Offcanvas, OffcanvasBody, OffcanvasHeader} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faThLarge} from "@fortawesome/free-solid-svg-icons";
import sidebar_upper from "../../Assets/sidenav-upper-logo.svg"
import "./Sidebar.css"
import OffcanvasToggling from "react-bootstrap/OffcanvasToggling";

class Sidebar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: true
        }
    }

    handleSideBarOpen = () => {
        this.setState({
            show: true
        })
    }

    handleSideBarClose = () => {
        this.setState({
            show: false
        })
    }

    render() {
        return(
            <div>

                {/*----------------- Sidebar Navigation -----------------*/}
                {/*<div className={"wrapper"}>*/}
                {/*    <div className={"sidebar-top"}>*/}
                {/*        <Image src={sidebar_upper} alt="sidebar upper" />*/}
                {/*    </div>*/}
                {/*    <div className={"sidebar-middle"}>*/}
                {/*        <a href={"/dashboard"}>Dashboard</a> <br/>*/}
                {/*        <a href={"/user"}>Users</a> <br/>*/}
                {/*        <a href={"/library/add"}>Add Resource</a> <br/>*/}
                {/*    </div>*/}
                {/*    <div className={"sidebar-bottom"}>*/}
                {/*        FOOTER*/}
                {/*    </div>*/}
                {/*</div>*/}

                <Offcanvas show={this.state.show}
                           onHide={this.handleSideBarClose} >
                    <OffcanvasBody >
                        <div className={"wrapper"}>
                            <div className={"sidebar-top"}>
                                <CloseButton onClick={this.handleSideBarClose} className={"sidebar-close"}/>
                            </div>
                            <div className={"sidebar-middle"}>
                                <a href={"/dashboard"}>Dashboard</a> <br/>
                                <a href={"/user"}>Users</a> <br/>
                                <a href={"/library/add"}>Add Resource</a> <br/>
                            </div>
                            <div className={"sidebar-bottom"}>
                                FOOTER
                            </div>
                        </div>
                    </OffcanvasBody>


                </Offcanvas>



                {/*<Offcanvas show={this.state.show}*/}
                {/*           onHide={this.handleSideBarClose}*/}
                {/*           >*/}
                {/*    <Offcanvas.Header className={"sidebar"}>*/}
                {/*        <Image src={sidebar_upper} alt="sidebar upper" className={"p-0"}/>*/}
                {/*        /!*<Offcanvas.Title>ELMS</Offcanvas.Title>*!/*/}
                {/*    </Offcanvas.Header>*/}
                {/*    <Offcanvas.Body>*/}
                        {/*<ListGroup defaultActiveKey="#link1" variant="flush">*/}
                        {/*    <ListGroup.Item action href="/dashboard">*/}
                        {/*        <FontAwesomeIcon className={"mr-3"} icon={faThLarge}/>*/}
                        {/*        Dashboard*/}
                        {/*    </ListGroup.Item>*/}
                        {/*    <ListGroup.Item action href="/user">*/}
                        {/*        Users*/}
                        {/*    </ListGroup.Item>*/}
                        {/*    <ListGroup.Item action href="/classroom">*/}
                        {/*        Classroom*/}
                        {/*    </ListGroup.Item>*/}
                        {/*    <ListGroup.Item action href="/notice">*/}
                        {/*        Notices*/}
                        {/*    </ListGroup.Item>*/}
                        {/*    <ListGroup.Item action href="/library">*/}
                        {/*        Library*/}
                        {/*    </ListGroup.Item>*/}
                        {/*    <ListGroup.Item action href="/">*/}
                        {/*        Home*/}
                        {/*    </ListGroup.Item>*/}
                        {/*</ListGroup>*/}
                    {/*</Offcanvas.Body>*/}
                {/*</Offcanvas>*/}

                {/*----------------- Main UI -----------------*/}
                <div>
                    {/*----------------- Secondary Header -----------------*/}
                    <div>

                    </div>

                    {/*----------------- Hamburger menu btn -----------------*/}
                    <Button variant="light" onClick={this.handleSideBarOpen}>
                        <FontAwesomeIcon className={"mr-3"} icon={faBars}/>
                    </Button>
                </div>

            </div>
        )
    }
}

export default Sidebar;