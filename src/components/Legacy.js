import React, { Component } from 'react'

// Reference for legacy components
export default class Legacy extends Component {
    myMethod = () => {
        console.log("my function!");
    }

    componentDidMount = () => { 
        console.log("component did mount"); 
    }

    componentDidUpdate = (prevProps, prevState) => { 
        console.log("component did update");
        console.log(prevProps, prevState);
        this.myMethod();

    }
    
    render() {
        console.log("rendered");
        return (
            <div>
                Legacy {this.props.name}
            </div>
        )
    }
}
