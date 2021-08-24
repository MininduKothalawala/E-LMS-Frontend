import React, {Component} from 'react';
import {Form, Button, Card, Row, Image, Container, InputGroup} from 'react-bootstrap';
import AuthenticationService from './AuthenticationService';
import AthenticationDataService from './AuthenticationDataService';
import {withRouter} from 'react-router-dom';
import Swal from "sweetalert2";
import logo from "../../Assets/elms-logo-black-vertical.svg";
import top_design from "../../Assets/login-upper-design.svg";
import rectangle from "../../Assets/Rectangle-footer.svg";
import "../../Stylesheets/Login.css"
import {faEnvelope, faLock, faSearch, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
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
                    <Card style={{border: 'none'}}>
                        <Card.Body>
                            <Form>
                                <div className={"mb-3"}>
                                    <label htmlFor="userId" className="grey-text">
                                       Index No
                                    </label>
                                    <input type="text" name="indexno" className="form-control" placeholder={"ex: John Mayer"}
                                           value={this.state.indexno} required onChange={this.handleChange}/>
                                </div>

                                <div className={"mb-3"}>
                                    <label htmlFor="password" className="grey-text">
                                        Password
                                    </label>
                                    <input type="password" name="password" className="form-control" placeholder="Password"
                                           value={this.state.password} required onChange={this.handleChange}/>
                                </div>

                                <div className={"mb-3 mt-4"}>
                                    <Button variant={"primary"} name={"signup"} block onClick={this.loginClicked}
                                            style={{fontSize: 20, borderRadius: '0'}} className={"py-3"}>Login</Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Container>
                <Row className={"mt-5"}>
                    <Image src={rectangle} />
                </Row>
            </div>
        );
    }
}
export default withRouter(Login);