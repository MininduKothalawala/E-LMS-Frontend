import React, {Component} from "react";
import axios from "axios";
import {Button, Form, Table, ButtonGroup, Modal, Row, Col, InputGroup} from "react-bootstrap";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faExternalLinkAlt, faSearch, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import "../../Stylesheets/Admin-Tables-styles.css"
import ClassroomDetailsTeacher from "./Classroom-Details-Teacher";
import ClassroomUpdate from "./Classroom-Update";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import "jspdf-autotable";
import AuthenticationService from "../Login/AuthenticationService";



class ClassroomListTeacher extends Component {

    constructor(props) {
        super(props);



        this.state = {
            id: '',
            classrooms: [],
            show: false,
            display:false,
            filterGrade: '',
            filterSubject:'',
            classGrade:'',
            grades: [],
            classSubject:'',
            subjects:[],
            username: AuthenticationService.loggedUserName()
        }
    }
    componentDidMount() {
        this.refreshTable();
        this.getSubjectList();
    }

    refreshTable = () => {
        axios.get(' http://localhost:8080/classroom/getbyaddedBy/'+this.state.username)
            .then(response => {
                console.log(response.data)
                this.setState({classrooms: response.data})
            })
            .catch((error) => {
                console.log(error);
            })
    }

    handleChangeClassSubject = (event) => {
        this.setState({classSubject: event.target.value});
    }

    gotoDetails = (id) => {
        // set show:true so the modal box will be visible
        // set id to pass it to the next component through props,

        this.setState({
            id: id,
            display: true
        })
    }

    gotoUpdateClassroom = (id) => {
        this.setState({
            id: id,
            show: true
        })
    }

    deleteClassroom = (id) => {

        Swal.fire({
            title: 'Are you sure?',
            text: "Once deleted, you will not be able to recover this record!",
            icon: 'warning',
            background: '#fff',
            confirmButtonColor: '#454545',
            iconColor: '#ffc200',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete'
        }).then((result) => {

            if (result.isConfirmed) {
                axios.delete('http://localhost:8080/classroom/' + id)
                    .then(res => {

                        console.log(res.status);
                        if (res.status === 200) {



                            Swal.fire({
                                icon: 'success',
                                title: 'Successful',
                                text: "Classroom has been deleted!!",
                                background: '#fff',
                                confirmButtonColor: '#333533',
                                iconColor: '#60e004'
                            })

                            this.refreshTable();
                        }
                    });
            }
        })


    }

    //Modal box
    closeModalBox = () => {
        this.setState({show: false})
        this.refreshTable();
    }

    //Modal box
    closeDetailsBox = () => {
        this.setState({display: false})
        this.refreshTable();
    }

    getSubjectList = () =>{
        axios.get("http://localhost:8080/Subject/").then(
            response =>{
                this.setState({
                    grades: response.data
                })
            }
        )
    }


    filterChangeHandler = (e) =>{
        this.setState({filterGrade: e.target.value});

        axios.get(`http://localhost:8080/classroom/getbygrade/${e.target.value}`)
            .then(response => {
                console.log(response.data)
                this.setState({classrooms: response.data})
            })
            .catch((error) => {
                console.log(error);
            })
    }

    filterBySubject = (e) =>{
        this.setState({filterSubject: e.target.value});

        axios.get(`http://localhost:8080/classroom/getbysubject/${e.target.value}`)
            .then(response => {
                console.log(response.data)
                this.setState({classrooms: response.data})
            })
            .catch((error) => {
                console.log(error);
            })
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
        doc.text("Classroom Report", 14, 22)
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
        const headers = [["Class ID", "Grade", "Subject", "Topic", "Date", "Time", "Lecture Name", "Tute Name"]];

        // body array
        const classrooms = this.state.classrooms.map(
                cls => [
                    cls.id,
                    cls.grade,
                    cls.subject,
                    cls.topic,
                    cls.date,
                    cls.time,
                    cls.lec_filename,
                    cls.tute_filename

                ]
            );

        // content for autoTable
        let content = {
            head: headers,
            body: classrooms,
            styles: {
                lineColor: [245, 203, 91],                                              // column border color
                lineWidth: 0.3,                                                         // column border width
            },
            headStyles: {
                fillColor: [245, 203, 91],                                              // header background color
                textColor: [36,36,35]                                                   // header text color
            },
            didDrawPage: () => {

                /*------------------------------------------- page footer ---------------------------------------------*/
                let str = 'Page ' + doc.internal.getNumberOfPages();
                doc.setFontSize(10)
                doc.setTextColor(0)
                doc.text(str, 14, pageHeight - 10)
                doc.text("ELMS", pageWidth - 25, pageHeight - 10)
                /*-----------------------------------------------------------------------------------------------------*/
            },
            startY: 40,
            margin: { top: 30 }
        };

        doc.autoTable(content);

        doc.save("Classroom_Report_" + Date.now() + ".pdf");

    }


    render() {
        return (
            <div>

                <p>CLASSROOM MANAGEMENT</p>
                <div className={"table-wrapper"}>
                    <div>
                        <h3>Classrooms</h3>
                    </div>
                    <div className={"mb-2"}>
                        <Row>
                            <Col xl={5} lg={5}>
                                <InputGroup>
                                    <InputGroup.Text bsPrefix={"input-search-icon"}>
                                        <FontAwesomeIcon icon={faSearch}/>
                                    </InputGroup.Text>
                                    <Form.Control type="text"
                                                  placeholder="Search By Subject"
                                                  required
                                                  value={this.state.search}
                                                  onChange={this.filterBySubject}/>
                                </InputGroup>
                            </Col>
                            <Col>
                                <Form.Group as={Col} controlId={"formClassroomGrade"}>
                                    <Form.Select onChange={this.filterChangeHandler}>
                                        {
                                            this.state.grades.map(item =>
                                                <option value={item.grade}>{item.grade}</option>
                                            )
                                        }
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col>
                                {/* works for all the filters */}
                                <button className={"clear-filter-btn"}
                                        onClick={this.refreshTable}>
                                    Clear Filters
                                </button>
                            </Col>
                            <Col className={"text-end"}>
                                <button className={"view-more-btn"} onClick={this.ExportPdfReport}>Generate Report</button>
                            </Col>

                        </Row>
                    </div>

                    <Table responsive bordered>
                        <thead className={"table-custom-header"}>
                        <tr>
                            <th className={"text-center"}>Grade</th>
                            <th className={"text-center"}>Subject</th>
                            <th className={"text-center"}>Topic</th>
                            <th className={"text-center"}>Date</th>
                            <th className={"text-center"}>Time</th>
                            <th className={"text-center"}>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.classrooms.length === 0 ?
                                <tr align={"center"}>
                                    <td colSpan={"6"}>No records at the moment</td>
                                </tr>

                                : [
                                    this.state.classrooms.map(event =>
                                        <tr key={event.id}>
                                            <td className={"text-center"}>{event.grade}</td>
                                            <td className={"text-center"}>{event.subject}</td>
                                            <td className={"text-center"}>{event.topic}</td>
                                            <td className={"text-center"}>{moment(event.date).format('YYYY-MM-DD')}</td>
                                            <td className={"text-center"}>{event.time}</td>
                                            <td className={"text-center"}>
                                                <ButtonGroup>
                                                    <Button variant={"success"} key={event.id} onClick={() => this.gotoDetails(event.id)}>
                                                        <FontAwesomeIcon icon={faExternalLinkAlt}/>
                                                    </Button>
                                                    <Button variant={"warning"} key={event.id} onClick={() => this.gotoUpdateClassroom(event.id)}>
                                                        <FontAwesomeIcon icon={faEdit}/>
                                                    </Button>
                                                    <Button variant={"danger"} key={event.id} onClick={() => this.deleteClassroom(event.id)}>
                                                        <FontAwesomeIcon icon={faTrashAlt}/></Button>
                                                </ButtonGroup>

                                            </td>

                                        </tr>
                                    )
                                ]
                        }
                        </tbody>
                    </Table>
                </div>

                {/*------------------------ Modal Box for ViewMore Page ------------------------*/}
                <Modal show={this.state.display} onHide={this.closeDetailsBox} centered fullscreen={"sm-down"} size={"lg"}>
                    <Modal.Header closeButton>
                        <Modal.Title>Classroom Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className={"custom-modal-body-login p-0"}>
                        <ClassroomDetailsTeacher classId={this.state.id} key={this.state.id} />
                    </Modal.Body>
                </Modal>
                {/*------------------------------------------------------------------------------*/}

                {/*--------------------------Model Box to Edit Conference--------------------------*/}

                <Modal show={this.state.show} onHide={this.closeModalBox} centered fullscreen={"sm-down"} size={"lg"}>
                    <Modal.Header closeButton>
                        <Modal.Title>Classroom Update</Modal.Title>
                    </Modal.Header >
                    <Modal.Body className={"custom-modal-body-login p-0"}>
                        <ClassroomUpdate classId={this.state.id} key={this.state.id} close={this.closeModalBox} />
                    </Modal.Body>
                </Modal>

                {/*--------------------------------------------------------------------------------*/}


            </div>
        )
    }
}
export default ClassroomListTeacher;