import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Dashboard from "./Dashboard/Dashboard";

class Frontend extends Component {

    render() {
        return(
            <div>
                <Router>

                    <Switch>
                        <Route path="/" exact component={Dashboard}/>
                    </Switch>

                </Router>



            </div>
        )
    }

}

export default Frontend;
