import React, {Component} from "react";
import axios from "axios";
import {Link, withRouter} from 'react-router-dom';
import {Button,Badge, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faExternalLinkAlt, faSearch, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import "../../Stylesheets/Admin-Tables-styles.css"


class ClassroomListTeacher extends Component {

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
        this.props.history.push(`/teacherClassDetails/`+id)
    }

    handleUpdate = (id) => {
        this.props.history.push(`/updateClassDetails/`+id)
        // this.handleShow()
    }

    render() {
        return (
            <div>

                <p>CLASSROOM MANAGEMENT</p>
                <div className={"table-wrapper"}>
                    <div>
                        <h3>Classrooms</h3>
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
                    {/*                              onChange={this.handleSearchInput}/>*/}
                    {/*            </InputGroup>*/}
                    {/*        </Col>*/}
                    {/*        <Col className={"text-end"}>*/}
                    {/*            <button className={"filter-btn-guide"}>TEACHERS' GUIDE</button>*/}
                    {/*            <button className={"filter-btn-syllabus"}>SYLLABUS</button>*/}
                    {/*        </Col>*/}
                    {/*    </Row>*/}
                    {/*</div>*/}

                    <Table responsive bordered>
                        <thead className={"table-custom-header"}>
                        <tr>
                            <th>Grade</th>
                            <th className={"text-center"}>Subject</th>
                            <th className={"text-center"}>Topic</th>
                            <th className={"text-center"}>Date</th>
                            <th className={"text-center"}>Time</th>
                            <th className={"text-center"}>More Details</th>
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
                                                <Button className={"class-view-more-btn"} key={event.id} onClick={() => this.gotoDetails(event.id)}><FontAwesomeIcon icon={faExternalLinkAlt}/></Button>  <Button className={"class-edit-btn"} key={event.id} onClick={() => this.handleUpdate(event.id)}><FontAwesomeIcon icon={faEdit}/></Button>  <Button className={"class-delete-btn"} key={event.id} onClick={() => this.handleUpdate(event.id)}><FontAwesomeIcon icon={faTrashAlt}/></Button>
                                            </td>

                                        </tr>
                                    )
                                ]
                        }
                        </tbody>
                    </Table>

                </div>

            </div>
        )
    }
}
export default withRouter(ClassroomListTeacher);