import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Home from "./Home/Home";
import Sidebar from "./Dashboard_Navigations/Sidebar";
import Login from "./Login/Login";
import NotFound from "./404NotFound/NotFound";

class Frontend extends Component {

    componentDidMount() { }

    render() {
        return(
            <div>
                <Router>

                    <Switch>
                        <Route path="/" exact component={Home}/>
                        <Route path="/login" exact component={Login}/>

                        <Route path="/dashboard" exact component={Sidebar}/>

                        <Route component={NotFound}/>
                    </Switch>

                </Router>

            </div>
        )
    }

}

export default Frontend;
