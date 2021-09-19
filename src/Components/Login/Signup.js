import React, {Component} from 'react';
import { Col, Form, Row} from "react-bootstrap";
import UserService from "./UserService";
import * as Swal from "sweetalert2";
import {withRouter} from "react-router";
import "../../Stylesheets/Form-styles.css"

class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            indexno: '',
            name: '',
            password: '',
            email: '',
            mobile_no: '',
            role: 'role'
        }

    }

    componentDidMount() {
    }

    handleChange = (e) => {
        e.preventDefault();

        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();

        if (this.state.role !== "role") {

            let newuser = {
                indexno: this.state.indexno,
                password: this.state.password,
                name: this.state.name,
                role: this.state.role,
                mobileNo: this.state.mobile_no,
                email: this.state.email
            }

            UserService.createUser(newuser)
                .then(res => {
                    console.log(res.data)
                    this.clearData();
                    Swal.fire({
                        icon: 'success',
                        title: 'Successful',
                        text: 'User has been added!!',
                        background: '#fff',
                        confirmButtonColor: '#333533',
                        iconColor: '#60e004'
                    })


                })
                .catch(err => {
                    console.log(err.data)
                })

        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Successful',
                text: 'Please select a Role!',
                background: '#fff',
                confirmButtonColor: '#333533',
                iconColor: '#e0b004'
            })
        }
    }

    clearData = () => {
        this.setState({
            indexno: '',
            name: '',
            password: '',
            email: '',
            mobile_no: '',
            role: 'role'
        })
    }

    render() {
        return (
            <div>
                <p>USER MANAGEMENT</p>
                <div className={"form-wrapper"}>

                    <div>
                        <h3>User Registration</h3>
                    </div>

                    <div className={"p-0"}>
                        <Form onSubmit={this.handleSubmit}>
                            <Row>
                                <Form.Group controlId={"formFullName"}>
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control type="text" placeholder="Full name" value={this.state.name} name="name" required onChange={this.handleChange} />
                                </Form.Group>
                            </Row>

                            <Form.Group controlId={"formEmail"}>
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control type="email" placeholder="Email Address" name="email" value={this.state.email} required onChange={this.handleChange}
                                              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" />
                            </Form.Group>

                            <Row>
                                <Form.Group as={Col} controlId={"formIndexNo"}>
                                    <Form.Label>Index number</Form.Label>
                                    <Form.Control type="text" placeholder="Index number" name="indexno" value={this.state.indexno} required onChange={this.handleChange}/>
                                </Form.Group>
                                <Form.Group as={Col} controlId={"formPassword"}>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" name="password" value={this.state.password} required isInvalid={false} onChange={this.handleChange} />
                                </Form.Group>
                            </Row>

                            <Row>
                                <Form.Group as={Col} controlId={"formMobile"}>
                                    <Form.Label>Mobile number</Form.Label>
                                    <Form.Control type="text" placeholder="Mobile number" name="mobile_no" value={this.state.mobile_no} maxLength={10} required onChange={this.handleChange} />
                                </Form.Group>
                                <Form.Group as={Col} controlId={"formUserRole"}>
                                    <Form.Label>Select Role</Form.Label>
                                    <Form.Select required
                                                 name={"role"} value={this.state.role}
                                                 onChange={this.handleChange}>
                                        <option value={"role"}>Select role</option>
                                        <option value={"admin"}>Admin</option>
                                        <option value={"teacher"}>Teacher</option>
                                        <option value={"student"}>Student</option>
                                    </Form.Select>
                                </Form.Group>
                            </Row>

                            <div className={"text-end"}>
                                <button type={"reset"} className={"reset-form-btn"}>Reset</button>
                                <button type={"submit"} className={"submit-form-btn"}>Add User</button>
                            </div>
                        </Form>
                    </div>
                </div>

            </div>

        );
    }

}


export default withRouter (SignUp);