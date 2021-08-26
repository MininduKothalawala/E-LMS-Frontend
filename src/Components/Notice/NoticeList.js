import React, {Component} from "react";
import axios from "axios";
import {Button, Col, Form, InputGroup, Row, Table} from "react-bootstrap";
import swal from "sweetalert";
import {faSearch, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "../../Stylesheets/Admin-Tables-styles.css";

class NoticeList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            notices: []
        }
    }

    componentDidMount() {
        this.refreshTable();
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

    render() {
        const {notices} = this.state;

        return (
            <div>

                <p>NOTICE MANAGEMENT</p>
                <div className={"table-wrapper"}>

                    <div>
                        <h3>Notices</h3>
                    </div>
                    <Table bordered responsive>
                        <thead className={"table-custom-header"}>
                        <tr>
                            <th>Notice ID</th>
                            <th>Subject</th>
                            <th>Grade</th>
                            <th>Topic</th>
                            <th>Body</th>
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
                                                <td className={"text-center"}>
                                                    <Button variant={"danger"} type={"submit"}
                                                            onClick={this.deleteItem.bind(this, notice.noticeId)}>
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

export default NoticeList;
