import React, { Component } from 'react';
import axios from 'axios';

class PostForm extends Component {
    constructor(props){
        super(props);
        this.state={
            data:{
                text:''
            },
            error:{
                err:''
            },
            success:'',
            user: this.props.user
        }
        this.handleAddPost = this.handleAddPost.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(element){
        console.log(this.state);
        var formData = this.state.data;
        formData[element.target.name] = element.target.value;
        this.setState({
            data: formData
        })
    }

    handleAddPost(event){
        event.preventDefault();
        console.log(this.state.data.text)
        let _this = this;
        let record ={user: this.state.user.name, userID: this.state.user._id, text:this.state.data.text}
        axios.post('http://localhost:8080/api/addpost', record)
            .then( result =>{
                _this.setState({
                    data:{
                        text:''
                    },
                    error:{
                        err:''
                    },
                    success:'your post was added successfuly'
                })
                window.location.href = '/mainpage';
            })
            .catch(function(error){
                if(error.reponse){
                    let mainError = error.response.data.errors;
                    let err_msg = mainError ? mainError.err.msg : '';
                    this.setState({
                        error:{
                            err: err_msg
                        }
                    })
                }
            })
    }
    render() {
        return (
            <div className="col col-md-12">
                {this.state.success}
                <form onSubmit={this.handleAddPost}>
                    <div className="form-group">
                        <textarea onChange={this.handleChange} className="form-control" name="text" value={this.state.data.text} ref="text" placeholder="Your message"
                        ></textarea>
                        <p className="text-danger">{this.state.error.err}</p>
                    </div>
                    <input type="submit" className="btn btn-primary" value="Post" />
                </form>
            </div>
        );
    }
}

export default PostForm;