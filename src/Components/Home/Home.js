import React, {Component} from "react";
import {Col, Container, Form, Image, Nav, Navbar, Row} from "react-bootstrap";
import NavbarToggle from "react-bootstrap/NavbarToggle";
import {Link} from "react-router-dom";
import logo from "../../Assets/elms-logo-black.svg"
import studyImg from "../../Assets/elearning.png";
import mailBoxImg from "../../Assets/Mailbox-bro.png";
import "../../Stylesheets/Home.css";

class Home extends  Component {


    render() {

        // const isUserLoggedIn = AuthenticationService.isUserLoggedIn();

        return(
            <div>
                <div className={"background"}>
                    <Container className={"pt-4"}>
                        {/*------------------------ Header ------------------------*/}
                        <Navbar collapseOnSelect expand={"lg"} className={"header-div"} >

                            <Navbar.Brand href="/">
                                <Image src={logo} width={150} />
                            </Navbar.Brand>
                            <NavbarToggle aria-controls={"responsive-navbar-nav"} />
                            {/*TODO: Design should be changed when collapsing*/}
                            <Navbar.Collapse id={"responsive-navbar-nav"}  className={"justify-content-end"}>
                                <Navbar.Text>
                                    <Link to={"/dashboard"} className={"classroom-btn"}>My Classroom</Link>
                                    {/*<Link to={"/dashboard"} className={"login-btn"}>Sign In</Link>*/}
                                </Navbar.Text>
                            </Navbar.Collapse>
                            {/*TODO: When Logged in MY CLASSROOM Should be displayed*/}
                        </Navbar>

                        {/*------------------------ Upper body Content ------------------------*/}
                        <Row className={"row-upper"}>
                            <Col xl={5}>
                                <div className={"title"}>
                                    Lorem ipsum dolor sit amet.
                                </div>
                                <div className={"paragraph"}>
                                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                                    nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
                                    erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
                                    et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
                                    Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
                                    sadipscing elitr, sed diam nonumy.
                                </div>
                            </Col>
                            <Col xl={6}>
                                <Image src={studyImg} width={780} />
                            </Col>
                        </Row>

                    </Container>
                </div>

                {/*------------------------ Lower half Content ------------------------*/}
                <Container className={"row-upper"}>
                    <Row>
                        <Col className={"mr-5"}>
                            <Image src={mailBoxImg} height={600} />
                        </Col>
                        <Col className={"ml-5 pl-5"}>
                            <div className={"sub-title"}>
                                Contact Us
                            </div>

                                <Form>
                                    <Row>
                                        <Form.Group as={Col} controlId={"formContactName"}>
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control type={"text"}
                                                          name={"name"}
                                                          placeholder="Your name"
                                                          required />
                                        </Form.Group>
                                        <Form.Group as={Col} controlId={"formContactEmail"}>
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type={"text"}
                                                          name={"email"}
                                                          placeholder="Your email"
                                                          required />
                                        </Form.Group>
                                    </Row>
                                    <Form.Group controlId={"formNoticeBody"}>
                                        <Form.Label>Body</Form.Label>
                                        <Form.Control as="textarea"
                                                      name="message"
                                                      placeholder="Type your message here"
                                                      rows={5}
                                                      required />
                                    </Form.Group>
                                    <div className={"text-center"}>
                                        <button type={"submit"} className={"contact-form-btn"}>Send</button>
                                    </div>
                                </Form>

                        </Col>
                    </Row>
                </Container>

                {/*------------------------ Footer ------------------------*/}
                <div className={"footer"}>
                    <Container className={"text-center"}>
                            Copyright &copy; 2021. All Rights Reserved
                    </Container>
                </div>

            </div>
        )
    }
}

export default Home;