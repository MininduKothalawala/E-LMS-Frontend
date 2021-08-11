import React, {Component} from "react";
import "./Home.css";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import NavbarToggle from "react-bootstrap/NavbarToggle";

class Home extends  Component {

    render() {
        return(
            <div className={"grid-container"}>

                {/*------------------------ Header ------------------------*/}
                <div className={"header"}>
                    <Navbar collapseOnSelect expand={"lg"} className={"header-div"} variant={"light"}>
                        <Container>
                            <Navbar.Brand href="/">
                                <h1>ELMS</h1>
                            </Navbar.Brand>
                            <NavbarToggle aria-controls={"responsive-navbar-nav"} />
                            {/*TODO: Design should be changed when collapsing*/}
                            <Navbar.Collapse id={"responsive-navbar-nav"} className={"justify-content-end"}>
                                <Nav className={"me-auto"}>
                                    {/*TODO: When Logged in MY CLASSROOM Should be displayed*/}
                                    <Nav.Link href="#login">
                                        <div className={"login-btn"}>Login</div>
                                    </Nav.Link>
                                    <Nav.Link href="#reg">
                                        <div className={"reg-btn"}>Get Started</div>
                                    </Nav.Link>
                                    <Nav.Link href="#reg">
                                        <div className={"classroom-btn"}>My Classroom</div>
                                    </Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div>

                {/*------------------------ Main Content ------------------------*/}
                <div className={"content"}>
                    <Container className={"text-left mt-2 mb-5"}>
                        <h1 className={"mt-1"}>Some quote about <span className={"highlighted-text"}>education.</span></h1>
                        <h6 className={"text-muted mt-5"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h6>
                        {/*TODO: Redirects to registration*/}
                        <Button className={"mt-5"} variant={"success"}>Get Started</Button>
                    </Container>

                    <div className={"second-content"}>
                        <Container>
                            <h2>Some more content</h2>
                            <h6 className={"text-muted mt-3"}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                                labore et dolore magna aliqua. Pretium vulputate sapien nec sagittis. Dictum non consectetur
                                a erat nam at lectus urna. Sed cras ornare arcu dui vivamus arcu felis bibendum. Mauris sit amet
                                massa vitae tortor condimentum lacinia quis. Egestas fringilla phasellus faucibus scelerisque
                                eleifend donec pretium vulputate. Purus non enim praesent elementum. Habitant morbi tristique
                                senectus et. Donec et odio pellentesque diam volutpat commodo sed. Nibh tellus molestie nunc non
                                blandit massa enim. Faucibus turpis in eu mi bibendum neque. Proin sagittis nisl rhoncus mattis
                                rhoncus urna neque viverra justo. Leo in vitae turpis massa sed elementum. Pellentesque pulvinar
                                pellentesque habitant morbi tristique senectus et netus et. Dignissim suspendisse in est ante in
                                nibh mauris cursus mattis. Dolor sed viverra ipsum nunc. Quis eleifend quam adipiscing vitae proin
                                sagittis nisl rhoncus. Elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus.
                                Auctor eu augue ut lectus arcu bibendum at varius.
                            </h6>
                        </Container>
                    </div>
                </div>

                {/*------------------------ Footer ------------------------*/}
                <div className={"footer"}>
                    <div className={"footer-content"}>
                        <p>&copy; 2021 All Rights Reserved</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;