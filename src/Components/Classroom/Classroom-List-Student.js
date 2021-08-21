import React, {Component} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {Card} from "react-bootstrap";

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

class ClassroomListStudent extends Component{

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
        this.props.history.push(`/classroom/`+id)
    }

    render() {
        return (

            <div>
                {/*-----------------------------------------------Header---------------------------------------------*/}
                <div>
                    <div className={"conference-header"}>
                        <Header/>
                    </div>
                    <div className={"conference-page-img-overlay"}>
                        <Image className={"conference-page-img"} src={bgImg} alt="background image"/>
                    </div>
                    <Container className={"conference-page-title"}>
                        <h1 className={"conference-page-title-h1"}>Conferences</h1>
                        <div className={"conference-breadcrumb"}>
                            <h5 className={"conference-page-title-h5"}>
                                <a href={"/"}>Home > </a>
                                Conferences
                            </h5>
                        </div>
                    </Container>
                </div>

                {/*----------------------------------------Main Content----------------------------------------------*/}
                <div>
                    <Container>


                        <div className={"conference-outer-div"}>
                            {
                                this.state.conferences.length > 0 ?
                                    [
                                        <Row key={0} className={"conference-card-row"}>
                                            {
                                                this.state.conferences.map(event =>

                                                    <div className={"conference-card-col mb-4"} key={event.id}>
                                                        <div className={"conference-card"} key={event.id}
                                                             onClick={() => this.gotoDetails(event.id)}>
                                                            <div className={"text-center image-card"}>
                                                                <img alt={"card-background-image"} width={300}
                                                                     src={cardImg}/>
                                                            </div>
                                                            <div className={"conference-card-body"}>
                                                                <h5 className={"text-center"}>{event.conferenceName}</h5>
                                                                <p className={"text-center"}><FontAwesomeIcon
                                                                    icon={faMapMarkerAlt}
                                                                    className={"mr-3"}/> {event.venue}</p>
                                                                <p className={"text-center"}><FontAwesomeIcon
                                                                    icon={faMoneyBill}
                                                                    className={"mr-3"}/>LKR {event.payment}.00</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </Row>
                                    ]
                                    : <h1 className={"text-center my-5"}>No Conferences Available</h1>
                            }
                        </div>


                    </Container>
                </div>

                {/*-----------------------------------------------Footer---------------------------------------------*/}
                <div>
                    <Footer/>
                </div>
            </div>

        )
    }

}
export default ClassroomListStudent;