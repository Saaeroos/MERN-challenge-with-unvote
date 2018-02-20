import React, { Component } from 'react';
import axios from 'axios';
import PostForm from './PostForm';
import Posts from './Posts';

axios.defaults.withCredentials = true;



class Mainpage extends Component {
    constructor(props){
        super(props);
        this.state={
            // username:'',
            // userid:''
            user:{},
            error:'Please Login'
        }
        axios.get('http://localhost:8080/api/currentuser')
            .then(function(result){
                console.log(result);
                this.setState({
                    // username: result.data.name,
                    // userid:result.data._id
                    user: result.data,
                    error: ''
                })
            }.bind(this))
            .catch(error => console.log(error))
    }
    handleLogout(){
        axios.get('http://localhost:8080/api/logout')
            .then( result =>{
                window.location.href = '/';
            })
            .catch( error => console.log(error))
    }
    render() {
        if(this.state.error === 'Please Login'){return <p>Please login</p>}
        return (
            <div>
                <h1> Hello, {this.state.user.name}</h1>
                <button className="Button" onClick={this.handleLogout}>Logout</button>
                <br />
                <br />
                <br />
                
                <PostForm user={this.state.user}/>
                <hr className="first" />
                <Posts user={this.state.user}/>
            </div>
        );
    }
}

export default Mainpage;