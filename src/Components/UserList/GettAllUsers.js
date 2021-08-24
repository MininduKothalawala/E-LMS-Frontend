import React, {Component} from 'react';
import {withRouter} from "react-router";
import {Col, Form, InputGroup, Row, Table} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import swal from "sweetalert";
import "../../Stylesheets/Admin-Tables-styles.css"

export let getAllUsers;


class gettAllUsers extends Component {

    constructor(props) {
        super(props);

        this.state = {
            User: [],
            indexno: '',
            name: '',
            password: '',
            email: '',
            mobile_no: '',
            role: ''
        }
        this.getAllUsers = this.getAllUsers.bind(this);
    }

    componentDidMount() {
        this.getAllUsers();
    }


    getAllUsers = () => {
        axios.get('http://localhost:8080/api/adminuser/alladmin').then(response => {
            // console.log(response.data)
            this.setState({
                User: response.data

            });

        }).catch(function (error) {
            console.log(error);
        })
    }

    deleteItem(id) {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this record!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.delete('http://localhost:8080/api/adminuser/deleteuser/' + id).then(response => {
                        console.log(response.data)
                        this.getAllUsers();
                    })
                    swal("Record has been deleted!", {
                        icon: "success",


                    });
                }
            });


    }


    render() {
        const {User} = this.state;

        return (
            <div>

                <p>USER MANAGEMENT</p>

                <div className={"table-wrapper"}>
                    <div>
                        <h3>Users</h3>
                    </div>
                    {/*<div className={"mb-2"}>*/}
                    {/*    <Row>*/}
                    {/*        <Col xl={5} lg={5}>*/}
                    {/*            <InputGroup>*/}
                    {/*                <InputGroup.Text bsPrefix={"input-search-icon"}>*/}
                    {/*                    <FontAwesomeIcon icon={faSearch}/>*/}
                    {/*                </InputGroup.Text>*/}
                    {/*                <Form.Control type="text"*/}
                    {/*                              placeholder="Search"*/}
                    {/*                              required*/}
                    {/*                              value={this.state.search}*/}
                    {/*                              onChange={this.handleSearchInput} />*/}
                    {/*            </InputGroup>*/}
                    {/*        </Col>*/}
                    {/*        <Col className={"text-end"}>*/}
                    {/*            <button className={"filter-btn-student"}>STUDENT</button>*/}
                    {/*            <button className={"filter-btn-teacher"}>TEACHERS</button>*/}
                    {/*            <button className={"filter-btn-admin"}>ADMINS</button>*/}
                    {/*        </Col>*/}
                    {/*    </Row>*/}
                    {/*</div>*/}

                    <Table bordered responsive>
                        <thead className={"table-custom-header"}>
                        <tr>
                            {/*TODO - headers must be changed */}
                            <th>Index No</th>
                            <th>Name</th>
                            <th>Email Address</th>
                            <th>Mobile Number</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>

                        {
                            User.length === 0 ?
                                <tr align="center">
                                    <td colSpan="6"><h6 className={"mt-3"}>No records at the moment</h6>
                                    </td>
                                </tr>

                                : [
                                    User.map(user => {
                                        return (
                                            <tr key={user.indexno}>
                                                <td>{user.indexno}</td>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                                <td>{user.mobileNo}</td>
                                                <td>{user.role}</td>
                                                <td>
                                                    <Button variant={"danger"} type={"submit"}
                                                            onClick={this.deleteItem.bind(this, user.indexno)}>
                                                        <FontAwesomeIcon icon={faTrashAlt}/>
                                                    </Button>

                                                </td>
                                            </tr>
                                        )
                                    })

                                ]
                        }


                        </tbody>
                    </Table>

                </div>
            </div>

        )


    }


}

export default withRouter(gettAllUsers);