import React, {Component} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {Button, Card, Container} from "react-bootstrap";
import "../../Stylesheets/Dashboard.css";

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
                    <div className={"dash-wrapper"}>
                        <div>
                            <h3>DASHBOARD</h3>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Dashboard;