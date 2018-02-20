import React, { Component } from 'react';
import axios from 'axios';

class Vote extends Component {
    constructor(props){
        super(props);
        // console.log(props);
        this.state={
            uservoted: false
        }
        let record = {
            postID : this.props.post._id,
            userID : this.props.user._id
        }
        axios.post('http://localhost:8080/api/post/uservoted', record)
            .then(result =>{
                console.log(result);
                if(result.data.userVoted === true){
                     this.setState({
                        uservoted: true
                     })
                }
                // else{
                //     this.setState({
                //         uservoted: 'false'
                //      })
                // }
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    uservoted: false
                })
            })
        this.handleUnVote = this.handleUnVote.bind(this);
        this.handleUnVoteModel = this.handleUnVoteModel.bind(this);
        this.handleVote = this.handleVote.bind(this);
        this.handleVoteModel = this.handleVoteModel.bind(this);
    }
    handleUnVote(id){
        axios.put('http://localhost:8080/api/post/unvote/'+id)
            .then(result =>{
                this.setState({
                    uservoted: false
                })
                window.location.href ="/mainpage"
            })
            .catch(error =>console.log(error))
    }
    handleUnVoteModel(id){
        axios.delete('http://localhost:8080/api/post/modelunvote/'+id)
        .then(result => console.log('success'))
        .catch(error => console.log(error))
    }
    handleVote(id){
        axios.put('http://localhost:8080/api/post/vote/'+ id)
            .then(result => {
                this.setState({
                    uservoted: 'true'
                })
                window.location.href = "/mainpage"
            })
            .catch(error => console.log(error))

    }
    handleVoteModel(id){
        let _this = this;
        console.log(_this.props.user);
        let record={
            postID: id,
            userID: _this.props.user._id
        }
        axios.post('http://localhost:8080/api/post/votemodel', record)
            .then(result => console.log('success'))
            .catch(error =>console.log(error))
    }

    render() {
        // console.log(this.props);
        return (
            <div>
                {this.state.uservoted === false
                    ?
                    <button className="vote Button" onClick={() =>{this.handleVoteModel(this.props.post._id);this.handleVote(this.props.post._id); }}> Upvote</button>
                    :
                    <p></p>
                }
                {this.state.uservoted === true
                    ?
                    <button className="unvote-Button" onClick={() =>{this.handleUnVoteModel(this.props.post._id);this.handleUnVote(this.props.post._id); }}> Unvote</button>
                    :
                    <p></p>
                }
            </div>
        );
    }
}

export default Vote;