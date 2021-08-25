import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Image} from "react-bootstrap";
import notFoundImg from "../../Assets/404-Pages.jpg";
import "../../Stylesheets/NotFound.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";


class NotFound extends Component {
    state = {  }
    render() {
        return (
            <div>
                <div className={"not-found-div"}>
                    <Image className={"not-found-img"} src={notFoundImg} alt="calendar-icon-tick"/>
                    <div className={"not-found-btn-div"}>
                        <Link to="/" className={"not-found-home"}>
                            <FontAwesomeIcon icon={faArrowLeft}/> &nbsp; Back to Home
                        </Link>
                    </div>
                </div>

            </div>

        );
    }
}

export default NotFound;