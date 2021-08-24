import {Component} from "react";
import axios from "axios";
import {Button, Table} from "react-bootstrap";
import swal from "sweetalert";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";

class FontAwesomeIcon extends Component {
    render() {
        return null;
    }
}

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
                this.setState({notices: response.data})
                console.log(response.data)
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
                <Table bordered hover striped variant={"dark"}>
                    <thead>
                    <tr className={"tableHeaders"}>
                        <th>Notice ID</th>
                        <th>Subject</th>
                        <th>Grade</th>
                        <th>Topic</th>
                        <th>Body</th>
                        <th>Action</th>
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
                                    // console.log(user)
                                    return (
                                        <tr key={notice.username}>
                                            <td style={{verticalAlign: 'middle'}}>{notice.noticeId}</td>
                                            <td style={{verticalAlign: 'middle'}}>{notice.noticeSubject}</td>
                                            <td style={{verticalAlign: 'middle'}}>{notice.noticeGrade}</td>
                                            <td style={{verticalAlign: 'middle'}}>{notice.noticeTopic}</td>
                                            <td style={{verticalAlign: 'middle'}}>{notice.noticeBody}</td>
                                            <td style={{verticalAlign: 'middle'}}>
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
        )
    }
}

export default NoticeList;
