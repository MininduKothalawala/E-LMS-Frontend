import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import axios from "axios";
import {Container,Card,Row,Image} from "react-bootstrap";


class ClassroomListStudent extends Component {

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




                <div >
                    <Card>
                    <Container>


                        <div className={"conference-outer-div"}>
                            {
                                this.state.classrooms.length > 0 ?
                                    [
                                        <Row key={0} className={"conference-card-row"}>
                                            {
                                                this.state.classrooms.map(event =>

                                                    <div className={"conference-card-col mb-4"} key={event.id}>
                                                        <div className={"conference-card"} key={event.id} onClick={() => this.gotoDetails(event.id)}>

                                                            <div className={"text-center image-card"}>
                                                                <img alt={"card-background-image"} width={300}
                                                                     src={event.classImg}/>
                                                            </div>
                                                            <div className={"conference-card-body"}>
                                                                <div><h5 className={"text-center"}>{event.grade}</h5>
                                                                    <h5 className={"text-center"}>{event.subject}</h5></div>

                                                               <div><h2 className={"text-center"}> {event.topic}</h2></div>
                                                                <div><h4>By {event.addedBy}</h4></div>
                                                              <div><p className={"text-center"}>Date : {event.date}</p>
                                                                  <p className={"text-center"}>Time : {event.time}</p></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </Row>
                                    ]
                                    : <h1 className={"text-center my-5"}>No Classroom Available</h1>
                            }
                        </div>


                    </Container>
                    </Card>
                </div>



        )
    }
}
export default withRouter(ClassroomListStudent);