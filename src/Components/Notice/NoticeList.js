import React, {Component} from "react";
import axios from "axios";
import {Button, ButtonGroup, Col, Container, Form, InputGroup, Modal, Row, Table} from "react-bootstrap";
import swal from "sweetalert";
import {faSearch, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "../../Stylesheets/Admin-Tables-styles.css";
import {faEdit} from "@fortawesome/free-regular-svg-icons";
import EditUser from "../User/EditUser";
import EditNotice from "./EditNotice";

class NoticeList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            notices: [],
            grades: [],
            filterGrade: '',
            show: false
        }
    }

    componentDidMount() {
        this.refreshTable();
        this.getSubjectList();
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

        axios.get(`http://localhost:8080/Notice/grade/${e.target.value}`)
            .then(response => {
                console.log(response.data)
                this.setState({notices: response.data})
            })
            .catch((error) => {
                console.log(error);
            })
    }

    refreshTable = () => {
        axios.get('http://localhost:8080/Notice/')
            .then(response => {
                console.log(response.data)
                this.setState({notices: response.data})
            })
            .catch((error) => {
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
                    axios.delete(`http://localhost:8080/Notice/delete/${id}`).then(response => {
                        console.log(response.data)
                        this.refreshTable();
                    })
                    swal("Record has been deleted!", {
                        icon: "success",
                    });
                }
            });
    }

    ExportPdfReport = () => {

        const unit = "pt";
        const size = "A4";
        const orientation = "portrait";
        const marginLeft = 60;
        const doc = new jsPDF(orientation, unit, size);

        const title = "Monthly Notices";
        const headers = [["Notice Id", "Subject", "Grade", "Notice Topic", "Notice Body", "Modified Date", "Modified Time"]];

        const notices = this.state.notices.map(
            ntc => [
                ntc.noticeId,
                ntc.noticeSubject,
                ntc.noticeGrade,
                ntc.noticeTopic,
                ntc.noticeBody,
                ntc.enteredDate,
                ntc.enteredTime
            ]
        );

        let content = {
            startY: 50,
            theme: 'grid',
            //theme: 'striped'|'grid'|'plain'|'css' = 'striped'
            head: headers,
            body: notices
        };
        doc.setFontSize(20);
        doc.text(title, marginLeft, 40);
        require('jspdf-autotable');
        doc.autoTable(content);

        doc.save("NoticeListReport.pdf")
    }

    handleShow = () => {
        this.setState({show: true})
    }

    handleClose = () => {
        this.setState({show: false})
        this.refreshTable();
    }

    editNotice = (noticeId) => {
        //console.log(indexno)
        this.setState({noticeId: noticeId})
        this.handleShow()

    }


    render() {
        const {notices} = this.state;

        return (
            <div>

                <p>NOTICE MANAGEMENT</p>
                <div className={"table-wrapper"}>

                    <div>
                        <h3>Notices</h3>
                    </div>
                    <Container>
                        <Row>
                            <Col>
                                <Form.Group as={Col} controlId={"formNoticeGrade"}>
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
                                <Button variant={"outline-secondary"}
                                        onClick={this.ExportPdfReport}>
                                    Download Report
                                </Button>
                            </Col>
                            <Col>
                                <Button variant={"outline-success"}
                                        onClick={this.refreshTable}>
                                    Clear Filter
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                    <Table bordered responsive>
                        <thead className={"table-custom-header"}>
                        <tr>
                            <th>Notice ID</th>
                            <th>Subject</th>
                            <th>Grade</th>
                            <th>Topic</th>
                            <th>Body</th>
                            <th>Modified Date</th>
                            <th>Modified Time</th>
                            <th className={"text-center"}>Action</th>
                        </tr>
                        </thead>
                        <tbody>

                        {
                            notices.length === 0 ?
                                <tr align="center">
                                    <td colSpan="6"><h6 className={"mt-3"}>No records at the moment</h6>
                                    </td>
                                </tr>

                                : [
                                    notices.map(notice => {
                                        return (
                                            <tr key={notice.username}>
                                                <td>{notice.noticeId}</td>
                                                <td>{notice.noticeSubject}</td>
                                                <td>{notice.noticeGrade}</td>
                                                <td>{notice.noticeTopic}</td>
                                                <td width={"500px"}>{notice.noticeBody}</td>
                                                <td>{notice.enteredDate}</td>
                                                <td>{notice.enteredTime}</td>
                                                <td className={"text-center"}>
                                                    <ButtonGroup>
                                                        <Button variant={"outline-danger"} type={"submit"}
                                                                onClick={this.deleteItem.bind(this, notice.noticeId)}>
                                                            <FontAwesomeIcon icon={faTrashAlt}/>
                                                        </Button>
                                                        <Button variant={"outline-warning"} type={"submit"}
                                                                onClick={this.editNotice.bind(this, notice.noticeId)}>
                                                            <FontAwesomeIcon icon={faEdit}/>
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
                        <Modal.Body> <EditNotice noticeId={this.state.noticeId}/> </Modal.Body>
                    </Modal>

                    {/*--------------------------------------------------------------------------------*/}
                </div>
            </div>
        )
    }
}

export default NoticeList;
