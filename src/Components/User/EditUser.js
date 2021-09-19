import React, {Component} from 'react';
import {Button, Card, Col, Form, Row} from "react-bootstrap";

import * as Swal from "sweetalert2";
import {withRouter} from "react-router";
import "../../Stylesheets/Form-styles.css"
import UserDataService from "./UserDataService";
import AuthenticationService from "../Login/AuthenticationService";

class EditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            indexno: props.indexno,
            name: '',
            password: '',
            email: '',
            mobile_no: '',
            role: 'role'
        }

    }

    componentDidMount() {
        const loggedUser = AuthenticationService.loggedUserName();
        this.setState({
            username: loggedUser
        });

        const indexno = this.state.indexno
        console.log(indexno)
        console.log(this.state.indexno)

        //load data to the form to update
        UserDataService.getUser(indexno)
            .then( res => {
                console.log(res)

                if (res.status === 200) {
                    this.setState({
                        name: res.data.name,
                        password: res.data.password,
                        email: res.data.email,
                        mobile_no: res.data.mobile_no,
                        role: res.data.role,

                    })

                    console.log(this.state.mobile_no);
                }
            })

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
                mobile_no: this.state.mobile_no,
                email: this.state.email
            }

            UserDataService.editTemplate(newuser)
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

                <div className={"form-wrapper"}>

                    <div>
                       <center><h3>EDIT USER</h3></center>
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
                                    <Form.Control type="text" placeholder="Index number" name="indexno" value={this.state.indexno} required onChange={this.handleChange} disabled={true}/>
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
                              {/*  <center><button type={"reset"} className={"reset-form-btn"}>Reset</button></center>*/}
                               <center><button type={"submit"} className={"submit-form-btn"}>Update User</button></center>
                            </div>
                        </Form>
                    </div>
                </div>

            </div>

        );
    }


}


export default withRouter (EditUser);