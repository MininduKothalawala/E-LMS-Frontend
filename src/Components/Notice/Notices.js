import React, {Component} from 'react';
import {Card, Container, Row} from "react-bootstrap";
import axios from "axios";
import {faMapMarkerAlt, faMoneyBill} from "@fortawesome/free-solid-svg-icons";

class Notices extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            notices: []
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:8080/Notice/`)
            .then(response => {
                console.log(response.data)
                this.setState({notices: response.data})

            })
            .catch((error) => {
                console.log(error);
            })
    }

    // gotoDetails = (id) => {
    //     this.props.history.push(`/conference/`+id)
    // }

    render() {
        return(
            <div >
                <Container>
                    <div className={"conference-outer-div"}>
                        {
                            this.state.notices.length > 0 ?
                                [
                                    <Row key={0} className={"conference-card-row"}>
                                        {
                                            this.state.notices.map(event =>

                                                <div className={"conference-card-col mb-4"} key={event.id}>
                                                    <div className={"conference-card"} key={event.id} onClick={() => this.gotoDetails(event.id)}>
                                                        <div className={"text-center image-card"}>
                                                            <img alt={"card-background-image"} width={300}/>
                                                        </div>
                                                        <div className={"conference-card-body"}>
                                                            <h5 className={"text-center"}>{event.noticeTopic}</h5>
                                                            <p className={"text-center"}> {event.noticeGrade}</p>
                                                            <p className={"text-center"}>{event.noticeBody}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </Row>
                                ]
                                : <h1 className={"text-center my-5"}>No Notices Available</h1>
                        }
                    </div>
                </Container>
            </div>
        )
    }
}

export default Notices;
