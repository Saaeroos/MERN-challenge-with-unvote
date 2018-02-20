import React, { Component } from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';

axios.defaults.withCredentials = true;

class Login extends Component {
    constructor(props){
        super(props);
        this.state ={
            data:{
                email:'',
                password:''
            },
            error:{
                text:''
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(element){
        var formData = this.state.data;
        formData[element.target.name]=[element.target.value];
        this.setState({
            data: formData
        })
    }

    handleSubmit(event){
        event.preventDefault();
        let _this = this;
        console.log(this.state.data);
        axios.post('http://localhost:8080/api/login', this.state.data)
        .then(res => {
            console.log(res);
            _this.props.history.push({
                pathname:'/mainpage',
                state:{user: res.data}
            });
                window.location.href = '/mainpage'
        })
        .catch(error =>{
            console.log(error);
            console.log(error.response);
            if(error.response.data.message){
                this.setState({
                    error:{text: error.response.data.message}
                });
            }
        })
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>  
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail2">Email address</label>
                        <input type="email" name="email" value={this.state.data.email} onChange={this.handleChange} className="form-control" id="exampleInputEmail2" aria-describedby="emailHelp" placeholder="Enter email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword2">Password</label>
                        <input type="password" name="password" value={this.state.data.password} onChange={this.handleChange} className="form-control" id="exampleInputPassword2" placeholder="Password" />
                    </div>
                    <p className="text-danger">{this.state.error.text}</p>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                <br />
                <br />

            </div>
        );
    }
}

export default withRouter(Login);