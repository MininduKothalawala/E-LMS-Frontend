import React, {Component} from 'react';
import {withRouter} from "react-router";
import {Badge, Col, InputGroup, Row, Table, Form, ButtonGroup, Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faSearch, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import swal from "sweetalert";
import "../../Stylesheets/Admin-Tables-styles.css";
import UserDataService from "./UserDataService";
import Swal from "sweetalert2";
import EditUser from "./EditUser";
import jsPDF from "jspdf";
import "jspdf-autotable";
import {faPrint} from "@fortawesome/free-solid-svg-icons/faPrint";
import AuthenticationService from "../Login/AuthenticationService";
export let getAllUsers;


class gettAllUsers extends Component {

    constructor(props) {
        super(props);

        this.state = {
            User: [],
            indexno: '',
            search:'',
            name: '',
            password: '',
            email: '',
            mobile_no: '',
            role: '',
            show: false,
            username: AuthenticationService.loggedUserName()
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

    //filter by type
    handleFilter = (type) => {

        UserDataService.filterByType(type)
            .then(res => {
                if (res.status === 200) {
                    // console.log(res);
                    this.setState({User: res.data})
                }
            })

    }

    clearData = () => {
        this.setState({
            search: '',
            type: ''
        })
        this.getAllUsers();
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


    handleSearch = (e, indexno) => {
        e.preventDefault();

        if (indexno !== '') {

            UserDataService.searchByAddedUser(indexno)
                .then(res => {
                    console.log(res.data)
                    if (res.data != null) {
                        this.setState({
                            name: res.data.name,
                            email: res.data.email,
                            mobile_no: res.data.mobile_no,
                            role: res.data.role,
                            indexno: res.data.indexno,
                        })
                        Swal.fire({
                            title: this.state.name,
                            html: ' <table class="table table-bordered">\n' +
                                '              <tr>\n' +
                                '                <th>Name</th>\n' +
                                '                <td>'+this.state.name+'</td>\n' +
                                '              </tr>\n' +
                                '              <tr>\n' +
                                '                <th>IndexNo</th>\n' +
                                '                <td>'+this.state.indexno+'</td>\n' +
                                '              </tr>\n' +
                                '              <tr>\n' +
                                '                <th>Email\t</th>\n' +
                                '                <td>'+this.state.email+'</td>\n' +
                                '              </tr>\n' +
                                '              <tr>\n' +
                                '                <th>Phone Number</th>\n' +
                                '                <td>'+this.state.mobile_no+'</td>\n' +
                                '              </tr>\n' +
                                '              <tr>\n' +
                                '                <th>Role</th>\n' +
                                '                <td>'+this.state.role+'</td>\n' +
                                '              </tr>\n' +
                                '           </table>\n' ,
                            showClass: {
                                popup: 'animate__animated animate__fadeInDown'
                            },
                            hideClass: {
                                popup: 'animate__animated animate__fadeOutUp'
                            },

                            confirmButtonColor: '#3aa2e7',
                            iconColor: '#e00404'
                        })

                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Not Found',
                            html: '<p>Please enter a valid indexno!</p>',
                            confirmButtonColor: '#dcff00',
                            iconColor: '#e00404'
                        })
                        this.clearData();
                    }
                })
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Warning',
                html: '<p>Search field cannot be empty!</p>',
                confirmButtonColor: '#3aa2e7',
                iconColor: '#e0b004'
            })
        }

    }

    handleChange = (event) => {
        event.preventDefault();

        this.setState({
            search: event.target.value
        })
    }

    editUser = (indexno) => {
        console.log(indexno)
        this.setState({indexno: indexno})
        this.handleShow()

    }

    handleShow = () => {
        this.setState({show: true})
    }

    handleClose = () => {
        this.setState({show: false})
        this.getAllUsers();
    }

    ExportPdfReport = () => {



        const doc = new jsPDF();

        /*---------------------------------------------- page sizes ---------------------------------------------------*/
        const pageSize = doc.internal.pageSize;
        const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
        const pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
        /*-------------------------------------------------------------------------------------------------------------*/



        /*----------------------------------------------- page title --------------------------------------------------*/
        doc.setFontSize(20);                                                    // fontSize should come before the text
        doc.setTextColor(36,36,35)
        doc.text("User Information Report", 14, 22)
        /*-------------------------------------------------------------------------------------------------------------*/


        /*------------------------------------- generate date and time ------------------------------------------------*/
        const today = new Date();
        const timestamp = today.getFullYear() + "-" + today.getMonth() + "-" + today.getDay() + ":" + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

        let timestampText = doc.splitTextToSize("Generated at: " + timestamp,  pageWidth, {})
        doc.setFontSize(11)
        doc.setTextColor(100)
        doc.text(timestampText, 14, 30)
        /*-------------------------------------------------------------------------------------------------------------*/


        /*------------------------------------- generate logged username ----------------------------------------------*/
        let printUserName = doc.splitTextToSize("Generated by: " + this.state.username,  pageWidth, {})
        doc.setFontSize(11)
        doc.setTextColor(100)
        doc.text(printUserName, 14, 36)
        /*-------------------------------------------------------------------------------------------------------------*/

        // headers array
        const headers = [["User ID", "Name", "Email Address", "Mobile No", "Role"]];

        // body array
        const User = this.state.User.map(
            user => [
                user.indexno,
                user.name,
                user.email,
                user.mobile_no,
                user.role

            ]
        );


        let content = {
            head: headers,
            body: User,
            styles: {
                lineColor: [245, 203, 91],    // column border color
                lineWidth: 0.3,             // column border width
            },
            headStyles: {
                fillColor: [245, 203, 91],  //header background color
                textColor: [36,36,35]       //header text color
            },
            didDrawPage: () => {
                doc.setFontSize(20);        // fontSize should come before the text
                doc.setTextColor(36,36,35)
                doc.text("User Information Report", 14, 22)

                // Footer
                let str = 'Page ' + doc.internal.getNumberOfPages();

                // jsPDF 1.4+ uses getWidth, <1.4 uses .width
                doc.setFontSize(10)
                doc.text(str, 14, pageHeight - 10)
                doc.text("ELMS", pageWidth - 25, pageHeight - 10)
            },
            startY: 40,
            margin: { top: 30 }
        };

        doc.autoTable(content);

        doc.save("Library_Report_" + Date.now() + ".pdf");





    }



    render() {
        const {User,search} = this.state;

        return (
            <div>

                <p>USER MANAGEMENT</p>

                <div className={"table-wrapper"}>
                    <div>
                        <h3>Users</h3>
                    </div>
                    <div>
                        {/*  <ButtonGroup className={"temp-btn-grp"}>
                            <Form className={"mr-5"}>
                             <div>
                                    <InputGroup>
                                        <Form type={"text"} name={"search"} placeholder={"Search by indexno"}
                                                      className={"form-control"} value={search}
                                                      onChange={this.handleChange} onClick={this.clearData}/>
                                        <InputGroup.Append>
                                            <Button variant={"dark"} type={"submit"}
                                                    onClick={(e) => this.handleSearch(e, search)}>
                                                <FontAwesomeIcon icon={faSearch}/>
                                            </Button>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </div>*/}
                                <div className={"mb-2"}>
                                    <Row>
                                        <Col xl={6} lg={6}>
                                            <InputGroup>

                                                <Form.Control type="text"
                                                              placeholder="Search By IndexNo"
                                                              required
                                                              value={this.state.search}
                                                              onChange={this.handleChange} onClick={this.clearData}/>
                                                <Button variant={"dark"} type={"submit"}
                                                        onClick={(e) => this.handleSearch(e, search)}>
                                                    <FontAwesomeIcon icon={faSearch}/>
                                                </Button>
                                            </InputGroup></Col>
                                        <Col className={"text-end"} xl={6} lg={6}>
                                            <Button variant={"outline-info"} type={"submit"} className={"temp-btn-status"}
                                                    onClick={this.getAllUsers}>ALL USER</Button>
                                            <Button variant={"outline-success"} type={"submit"} className={"temp-btn-status"}
                                                    onClick={() => this.handleFilter("admin")}>ADMIN</Button>
                                            <Button variant={"outline-primary"} type={"submit"} className={"temp-btn-status"}
                                                    onClick={() => this.handleFilter("teacher")}>TEACHER</Button>
                                            <Button variant={"outline-warning"} type={"submit"} className={"temp-btn-status"}
                                                    onClick={() => this.handleFilter("student")}>STUDENT</Button>
                                        </Col>

                                        <Col className={"text-end"}>
                                            <Button variant={"outline-secondary"}
                                                    onClick={this.ExportPdfReport}>
                                                <FontAwesomeIcon icon={faPrint}/>
                                            </Button>

                                        </Col>
                                    </Row>
                                </div>
                    </div>

                    <Table bordered responsive>
                        <thead className={"table-custom-header"}>
                        <tr>
                            <th>User ID</th>
                            <th>Name</th>
                            <th>Email Address</th>
                            <th>Mobile Number</th>
                            <th className={"text-center"}>Role</th>
                            <th className={"text-center"}>Action</th>
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
                                                <td>{user.mobile_no}</td>
                                                <td className={"text-center"}>
                                                    <Badge bg={"dark"}>{user.role}</Badge>
                                                </td>
                                                <td className={"text-center"}>
                                                    <ButtonGroup>
                                                    <Button variant={"warning"} type={"submit"}
                                                            onClick={() => this.editUser(user.indexno)}>
                                                        <FontAwesomeIcon icon={faEdit}/>
                                                    </Button>
                                                    <Button variant={"danger"} type={"submit"}
                                                            onClick={this.deleteItem.bind(this, user.indexno)}>
                                                        <FontAwesomeIcon icon={faTrashAlt}/>
                                                    </Button>
                                                    </ButtonGroup>
                                                </td>

                                            </tr>
                                        )
                                    })

                                ]
                        }
                        </tbody>
                    </Table>

                    {/*--------------------------Modal Box to Edit Template--------------------------*/}

                    <Modal show={this.state.show} onHide={this.handleClose} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Update</Modal.Title>
                        </Modal.Header>
                        <Modal.Body> <EditUser indexno={this.state.indexno} /> </Modal.Body>
                    </Modal>

                    {/*--------------------------------------------------------------------------------*/}

                </div>
            </div>
        )


    }


}

export default withRouter(gettAllUsers);