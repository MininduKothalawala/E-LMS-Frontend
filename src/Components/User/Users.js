import React, {Component} from 'react';
import {Card, Container} from "react-bootstrap";

class Users extends Component {


    render() {
        return(
            <div>
                <Container className={"my-5"}>
                    <Card>
                        <Card.Body>
                            <h1>Users</h1>
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        )
    }
}

export default Users;