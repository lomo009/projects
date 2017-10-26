import React, { Component } from 'react'
import {Navbar} from "../Navbar";
import {bindActionCreators} from "redux";
import * as POST from '../../actions/posts'
import * as COMMENT from '../../actions/comments'
import {connect} from "react-redux";
import Post from "./Post";

class PostPage extends Component {

  componentWillMount() {
    let postId = this.props.match.params.id
    this.props.actions.loadPostById(postId)
    this.props.actions.loadCommentsById(postId)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.posts[0] === null) {
      return nextProps.history.push("/404")
    }
    this.setState({
      posts: nextProps.posts[0],
      comments: nextProps.comments
    })
  }

  render() {
    return (
      <div className="container-fluid" style={{padding:0}}>
        <Navbar/>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {this.props.posts[0] ? <Post post={this.props.posts[0]} showBody={true} comments={this.props.comments[this.props.posts[0].id]} showComments={true} /> : ""}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
    comments: state.comments
  }
}

function mapDispatchToProps(dispatch) {
  let actions = { ...POST, ...COMMENT};
  return {actions: bindActionCreators(actions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);
