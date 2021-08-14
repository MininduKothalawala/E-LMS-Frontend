import React, {Component} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {Button, Card, Container} from "react-bootstrap";

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    componentDidMount() {
        console.log(window.location.pathname)
    }


    render() {
        return(
            <div>
                <div>
                    <Container className={"my-5"}>
                        <Card>
                            <Card.Body>
                                <h1>Dashboard</h1>
                            </Card.Body>
                        </Card>
                    </Container>
                </div>
            </div>
        )
    }

}

export default Dashboard;