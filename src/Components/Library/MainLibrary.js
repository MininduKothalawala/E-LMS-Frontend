import React, {Component} from 'react';

class MainLibrary extends Component {
    constructor(props) {
        super(props);

        this.state = {
            libraries: [],
            search: ''
        }
    }

    render() {
        return(
            <div>
                MAIN LIBRARY
            </div>
        )
    }

}

export default MainLibrary;