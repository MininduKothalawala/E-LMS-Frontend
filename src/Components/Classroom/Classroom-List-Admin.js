import React, {Component} from "react";
import axios from "axios";
import {Link, withRouter} from 'react-router-dom';


class ClassroomListAdmin extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: '',
            classrooms: []
        }
    }
    componentDidMount() {
        axios.get(`http://localhost:8080/classroom/`)
            .then(response => {
                console.log(response.data)
                this.setState({classrooms: response.data})

            })
            .catch((error) => {
                console.log(error);
            })
    }

    gotoDetails = (id) => {
        this.props.history.push(`/adminClassDetails/`+id)
    }

    render() {
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
        <th>More Details</th>
    </tr>
    </thead>

    <tbody>
            {
                this.state.classrooms.map(event =>
                    <tr>
                <td>{event.grade}</td>
                <td>{event.subject}</td>
                    <td>{event.topic}</td>
                    <td>{event.date}</td>
                    <td>{event.time}</td>
                    <td>{event.addedBy}</td>
                        <td><button key={event.id} onClick={() => this.gotoDetails(event.id)}>View More Details</button></td>
                    </tr>
                )
            }


    </tbody>
</table>
            </div>
        )
    }
}
export default withRouter(ClassroomListAdmin);