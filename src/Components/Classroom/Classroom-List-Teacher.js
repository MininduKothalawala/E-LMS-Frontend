import React, {Component} from "react";
import axios from "axios";
import {Badge, Button, ButtonGroup, Modal, Table} from "react-bootstrap";
//import AuthenticationService from "../../Login/AuthenticationService";
//import UpdateConferenceDetailsComponent from "./Update-ConferenceDetails.Component";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import moment from "moment";
import ClassroomMain from "./ClassroomMain";
import {Link} from "react-router-dom";

const Classroom = props => (

    <tr>

        <td>{props.classroom.grade}</td>
        <td>{props.classroom.subject}</td>
        <td>{props.classroom.topic}</td>
        <td>{props.classroom.date}</td>
        <td>{props.classroom.time}</td>
        <td>{props.classroom.addedBy}</td>
        <td>
            <button><Link to = {"/updateClassDetails/"+props.classroom.id } className="link">Update</Link></button>  <button onClick ={() => {props.deleteClassroom(props.classroom._id)}}>Delete</button>  <button><Link to = {"/teacherClassDetails/"+props.classroom.id } className="link">View</Link></button>
        </td>
    </tr>
)

class ClassroomListTeacher extends Component {


    constructor(props) {
        super(props);

        this.deleteClassroom = this.deleteClassroom.bind(this);

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
                              deleteClassroom = {this.deleteClassroom} key = {currentclassroom.id}

            />
        })
    }

    deleteClassroom = (id) => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            background: '#041c3d',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#e00404',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete('http://localhost:5000/classroom/' + id)
                    .then(res => {
                        if (res.status === 204) {

                            Swal.fire({
                                icon: 'success',
                                title: 'Successful',
                                html: '<p>Your file has been deleted!</p>',
                                background: '#041c3d',
                                confirmButtonColor: '#3aa2e7',
                                iconColor: '#60e004'
                            })

                            this.refreshTable();
                        }
                    });
            }
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
export default ClassroomListTeacher;