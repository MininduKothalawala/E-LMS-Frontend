import React, {Component} from 'react';
import {Form, Button, Row, Image, Container, InputGroup} from 'react-bootstrap';
import AuthenticationService from './AuthenticationService';
import AthenticationDataService from './AuthenticationDataService';
import {withRouter} from 'react-router-dom';
import Swal from "sweetalert2";
import logo from "../../Assets/elms-logo-black-vertical.svg";
import top_design from "../../Assets/login-upper-design.svg";
import rectangle from "../../Assets/Rectangle-footer.svg";
import {faLock, faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "../../Stylesheets/Login.css"

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            indexno: '',
            password: '',
            hasLoginFailed: false,
            showSuccessMsg: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.loginClicked = this.loginClicked.bind(this);
    }

    handleChange(event) {
        this.setState(
            {[event.target.name]: event.target.value}
        )
    }

    loginClicked() {
        if (this.state.indexno === '' || this.state.password === '') {
            Swal.fire({
                icon: 'warning',
                title: 'Fileds cannot be empty',
                background: '#041c3d',
                confirmButtonColor: '#3aa2e7',
                iconColor: '#e0b004'
            })
        } else {
            AthenticationDataService.getUser(this.state.indexno)
                .then(
                    response => {
                        console.log(response.data)
                        if (response.data != null) {
                            if (this.state.password === response.data.password) {
                                AuthenticationService.successfulLogin(response.data.indexno, response.data.name, response.data.role)
                                this.props.history.push("/dashboard")
                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Wrong indexno or password',
                                    background: '#041c3d',
                                    iconColor: '#e00404',
                                    confirmButtonColor: '#3aa2e7'
                                })
                            }
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Wrong indexno or password',
                                background: '#041c3d',
                                iconColor: '#e00404',
                                confirmButtonColor: '#3aa2e7'
                            })
                        }
                    }
                )
        }

    }

    render() {
        return (
            <div className={"bg-login"}>
                <Row>
                    <Image src={top_design} />
                </Row>
                <Row className={"my-5"}>
                    <Image src={logo} height={170}/>
                </Row>
                <Container className={"px-4"}>
                    <Form>
                        <Form.Group controlId={"userId"} >
                            <InputGroup>
                                <InputGroup.Text bsPrefix={"input-login-icon"}>
                                    <FontAwesomeIcon icon={faUser}/>
                                </InputGroup.Text>
                                <Form.Control type={"text"}
                                              name={"indexno"}
                                              placeholder={"User ID"}
                                              required
                                              value={this.state.indexno}
                                              onChange={this.handleChange}
                                              className={"form-control-login"}/>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group controlId={"password"} className={"mt-4"}>
                            <InputGroup>
                                <InputGroup.Text bsPrefix={"input-login-icon"}>
                                    <FontAwesomeIcon icon={faLock}/>
                                </InputGroup.Text>
                                <Form.Control type={"password"}
                                              name={"password"}
                                              placeholder={"Password"}
                                              required
                                              value={this.state.password}
                                              onChange={this.handleChange}
                                              className={"form-control-login"}/>
                            </InputGroup>
                        </Form.Group>

                        <div className={"text-center"}>
                            <Button name={"signup"} onClick={this.loginClicked}
                                    className={"login-form-btn"}>Login</Button>
                        </div>
                    </Form>
                </Container>
                <Row className={"mt-5"}>
                    <Image src={rectangle} />
                </Row>
            </div>
        );
    }
}
export default withRouter(Login);