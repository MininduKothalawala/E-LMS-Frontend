import React, {Component} from "react";
import {CloseButton, Col, Container, Form, Image, Modal, Navbar, Row} from "react-bootstrap";
import NavbarToggle from "react-bootstrap/NavbarToggle";
import logo from "../../Assets/elms-logo-black.svg"
import studyImg from "../../Assets/elearning.png";
import mailBoxImg from "../../Assets/Mailbox-bro.png";
import "../../Stylesheets/Home.css";
import Login from "../Login/Login";
import AuthenticationService from "../Login/AuthenticationService";
import {Link} from "react-router-dom";
import emailjs from 'emailjs-com';
import Swal from "sweetalert2";

class Home extends  Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
            name: '',
            email: '',
            message: ''
        }
    }

    //Modal box
    showModalBox = () => {
        this.setState({show: true})
    }
    //Modal box
    closeModalBox = () => {
        this.setState({show: false})
    }

    onChangeHandler = (event) => {
        event.preventDefault();

        this.setState({
            [event.target.name]: event.target.value
        })
    }

    validateDetails = (event) => {
        event.preventDefault();

        const name = this.state.name;
        const email = this.state.email;
        const message = this.state.message;

        if (name === '') {
            Swal.fire({
                icon: 'warning',
                title: 'Name Required',
                text: "Please enter your name!",
                background: '#fff',
                confirmButtonColor: '#333533',
                iconColor: '#ffc200'
            })
        } else if (email === '') {
            Swal.fire({
                icon: 'warning',
                title: 'Email Required',
                text: "Please enter your email!",
                background: '#fff',
                confirmButtonColor: '#333533',
                iconColor: '#ffc200'
            })
        } else if (message === '') {
            Swal.fire({
                icon: 'warning',
                title: 'Empty Message Body',
                text: "Please type your message!",
                background: '#fff',
                confirmButtonColor: '#333533',
                iconColor: '#ffc200'
            })
        } else {
            this.sendMailToUser();
        }
    }

    sendMailToUser = () => {
        const templateParams = {
            to_name: this.state.name,
            reply_to: this.state.email,
        }
        console.log("SENDING");
        emailjs.send("service_43ralg4","template_elms", templateParams, "user_PyUUh24kydBDGGDfaHJbO")
            .then( res => {
                console.log(res)
                if (res.status === 200) {
                    this.clearData();

                    Swal.fire({
                        icon: 'success',
                        title: 'Successful',
                        text: "Check your email for more details",
                        background: '#fff',
                        confirmButtonColor: '#333533',
                        iconColor: '#60e004'
                    })
                }
            }, (error) => {
                console.log(error)

                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: "There was an error sending the message!",
                    background: '#fff',
                    confirmButtonColor: '#333533',
                    iconColor: '#e00404'
                })
            })
    }

    clearData = () => {
        this.setState({
            name: '',
            email: '',
            message: ''
        })
    }


    render() {

        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();

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
                                    { isUserLoggedIn &&
                                        <Link to={"/dashboard"} className={"classroom-btn"}>My Classroom</Link>
                                    }
                                    { !isUserLoggedIn &&
                                        <button className={"login-btn"} onClick={this.showModalBox}>Sign In</button>
                                    }
                                </Navbar.Text>
                            </Navbar.Collapse>
                        </Navbar>

                        {/*------------------------ Upper body Content ------------------------*/}
                        <Row className={"row-upper"}>
                            <Col xl={5}>
                                <div className={"title"}>

                                    Education is the most powerful thing that you can earn in your life journey

                                </div>
                                <div className={"paragraph"}>
                                    “There is no end to education.
                                    It is not that you read a book, pass an examination,
                                    and finish with education.
                                    The whole of life,
                                    from the moment you are born to the moment you die,
                                    is a process of learning.”

                                    Jiddu Krishnamurti
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
                                <Form onSubmit={this.validateDetails}>
                                    <Row>
                                        <Form.Group as={Col} controlId={"formContactName"}>
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control type={"text"}
                                                          name={"name"}
                                                          value={this.state.name}
                                                          placeholder="Your name"
                                                          className={"form-control-home"}
                                                          onChange={this.onChangeHandler}/>
                                        </Form.Group>
                                        <Form.Group as={Col} controlId={"formContactEmail"}>
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type={"text"}
                                                          name={"email"}
                                                          value={this.state.email}
                                                          placeholder="Your email"
                                                          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                                                          className={"form-control-home"}
                                                          onChange={this.onChangeHandler}/>
                                        </Form.Group>
                                    </Row>
                                    <Form.Group controlId={"formNoticeBody"}>
                                        <Form.Label>Body</Form.Label>
                                        <Form.Control as="textarea"
                                                      name="message"
                                                      placeholder="Type your message here"
                                                      rows={5}
                                                      value={this.state.message}
                                                      className={"form-control-home"}
                                                      onChange={this.onChangeHandler} />
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


                {/*------------------------ Modal Box for Login ------------------------*/}
                <Modal show={this.state.show} centered fullscreen={"sm-down"} size={"md"}>
                    <Modal.Header className={"custom-modal-body-login px-4"}>
                        <CloseButton onClick={this.closeModalBox} className={"close-login"} /> <br/>
                    </Modal.Header>
                    <Modal.Body className={"custom-modal-body-login p-0"}> <Login/> </Modal.Body>
                </Modal>

            </div>
        )
    }
}

export default Home;
