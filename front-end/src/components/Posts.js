import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Vote from './Vote';
// import Operations from './Operations';

class Posts extends Component {
    constructor(props){
        super(props);
        console.log(props);
            this.state ={
                posts: null,
                user:{}
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

            // this.handleVote = this.handleVote.bind(this);
            // this.handleVoteModel = this.handleVoteModel.bind(this);
            // this.checkIfUserVoted = this.checkIfUserVoted.bind(this);

    }
    // handleVote(id){
    //     axios.put('http://localhost:8080/api/post/vote/'+ id)
    //         .then(result => {
    //             window.location.href = "/mainpage"
    //         })
    //         .catch(error => console.log(error))

    // }
    // handleVoteModel(id){
    //     let _this = this;
    //     console.log(_this.props.user);
    //     let record={
    //         postID: id,
    //         userID: this.props.user._id
    //     }
    //     axios.post('http://localhost:8080/api/post/votemodel', record)
    //         .then(result => console.log('success'))
    //         .catch(error =>console.log(error))
    // }
    // handleUnvote(id){
    //     axios.put('http://localhost:8080/api/post/unvote'+id)
    //         .then(result =>{
    //             window.location.href = "/mainpage"
    //         })
    //         .catch(error =>console.log(error));
    // }
    // checkIfUserVoted(postid){
    //     // console.log(this.props.user)
    //     let _this = this;
    //     let record = {
    //         postID : postid,
    //         userID : _this.props.user._id
    //     }
    //     axios.get('http://localhost:8080/api/post/uservoted', record)
    //         .then(result =>{
    //             console.log(result);
    //             if(result.data.uservoted === true){
    //                  _this.setState({
    //                     uservoted: true
    //                  })
    //             }
    //             else{
    //                 _this.setState({
    //                     uservoted: false
    //                  })
    //             }
    //         })
    //         .catch(error => {
    //             console.log(error);
    //             // _this.setState({
    //             //     uservoted: false
    //             // })
    //         })
    // }

    componentDidMount(){
        console.log(this.state);
        let _this= this;
        axios.get('http://localhost:8080/api/posts')
            .then(result => {
                _this.setState({
                    posts: result.data
                })
            })
            .catch(error =>console.log(error));
    }

    render() {
        // console.log(this.state.posts);
        // if(this.state.error){
        //     return <p> please login</p>
        // }
        return (
            <div>
                <br />
                <br />
                
                {this.state.posts
                ?
                <div>
                {this.state.posts.map(function(post){
                  
                            return(

                                <div key={post._id}>
                                    <h4>{post.text}</h4>
                                    <br />
                                    <h3>Uploader: {post.user}</h3>
                                    <h3>Upvotes: {post.vote}</h3>
                                    <Vote post={post} user={this.props.user} />
                                    <hr />
                                </div>
                            )
                        }.bind(this))}
                </div>

                :
                <p> there is no posts </p>
                }
            </div>
        );
    }
}

export default Posts;