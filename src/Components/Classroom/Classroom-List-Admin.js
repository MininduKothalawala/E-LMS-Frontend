import React, {Component} from "react";
import axios from "axios";
import {Link} from 'react-router-dom';
import {Badge, Button, ButtonGroup, Modal, Table} from "react-bootstrap";
//import AuthenticationService from "../../Login/AuthenticationService";
//import UpdateConferenceDetailsComponent from "./Update-ConferenceDetails.Component";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import moment from "moment";
import ClassroomMain from "./ClassroomMain";

const Classroom = props => (

    <tr>

        <td>{props.classroom.grade}</td>
        <td>{props.classroom.subject}</td>
        <td>{props.classroom.topic}</td>
        <td>{props.classroom.date}</td>
        <td>{props.classroom.time}</td>
        <td>{props.classroom.addedBy}</td>
        <td>
            <button><Link to = {"/adminClassDetails/"+props.classroom.id } className="link">View</Link></button>
        </td>

    </tr>
)

class ClassroomListAdmin extends Component {

    constructor(props) {
        super(props);

        this.state = {
            classrooms: [],
            classroomId: '',

        }
    }

    componentDidMount() {
        this.refreshTable();
    }

    refreshTable = () => {
        axios.get('http://localhost:8080/classroom/')
            .then(response => {
                this.setState({classrooms: response.data})
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    classroomList() {
        return this.state.classrooms.map(currentclassroom => {
            return <Classroom classroom={currentclassroom} key={currentclassroom.id}

            />
        })
    }


    render (){
        return (
<div>
            <table>
                <thead>
                <tr>

                    <th>Grade</th>
                    <th>Subject</th>
                    <th>Topic</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Added By</th>
                </tr>
                </thead>

                <tbody>
                { this.classroomList() }
                </tbody>
            </table>
</div>
        )
    }
}
export default ClassroomListAdmin;