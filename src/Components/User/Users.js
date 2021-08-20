import React, {Component} from 'react';
import {Card, Container} from "react-bootstrap";
import SignUp from "../Login/Signup";
import GettAllUsers from "../UserList/GettAllUsers";

class Users extends Component {


    render() {
        return(
            <div>
                <Container className={"my-5"}>
                    <Card>
                        <Card.Body>
                            <h1>Add user</h1>
                            <SignUp></SignUp>
                            <GettAllUsers></GettAllUsers>
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        )
    }
}

export default Users;