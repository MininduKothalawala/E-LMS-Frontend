import React, {Component} from 'react';
import {Card, Container} from "react-bootstrap";

class ClassroomMain extends Component {


    render() {
        return(
            <div>
                <div>
                    <Container className={"my-5"}>
                        <Card>
                            <Card.Body>
                                <h1>Classroom</h1>
                            </Card.Body>
                        </Card>
                    </Container>
                </div>
            </div>
        )
    }
}

export default ClassroomMain;