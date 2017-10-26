import React, { Component } from 'react'
import {Navbar} from "../Navbar";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import PostList from "./PostList";
import * as POST from "../../actions/posts";
import * as COMMENT from "../../actions/comments";
import * as HELPERS from "../../utils/helpers";
import Modal from  'react-modal'


class PostsPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      openModal: false,
      isEditing: false,
      newPost: {
        'title': '',
        'body': '',
        'category': 'react'
      }
    }
  }

  componentWillMount() {
    this.props.actions.loadPosts()
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      posts: nextProps.posts,
      sortBy: nextProps.sortBy,
      categories: nextProps.categories
    })
  }

  xSort = (e) => {
    let sortBy = e.target.value
    this.setState((prevState) => ({
      posts: HELPERS.sort(prevState.posts, sortBy),
      sortBy: sortBy
    }))
  }

  openModal = () => {
    this.setState({
      openModal: true
    })
  }

  closeModal = () => {
    this.setState({
      openModal: false
    })
  }

  handleChange = (e) => {
    let key = e.target.id
    let newPost = this.state.newPost
    newPost[key] = e.target.value
    this.setState({
      newPost: newPost
    })
  }

  createPost = (e) => {
    e.preventDefault()
    this.setState({
      openModal: false
    })

    const post = {
      ...this.state.newPost,
      id: HELPERS.createId(),
      timestamp: Date.now(),
      author: 'elem09',
      voteScore: 0
    }
    this.props.actions.createPost(post)
    this.setState({
      newPost: {
        'title': '',
        'body': '',
        'category': ''
      }
    })
  }

  render() {
    return (
      <div className="container-fluid" style={{padding:0}}>
        <Navbar/>
        <div className="row" style={{alignSelf: "center"}}>
          <div className="col-md-8">
            <ul className="nav nav-pills" style={{marginTop: 10, marginLeft: 5 }}>
              {this.props.categories.map(category => (
                <li className="nav-item">
                  <a className="" href={"/"+category.path} style={{textDecoration:null}} key={category.path}><button className="btn btn-default" style={{fontSize: 16}}>{category.name}</button></a>
                </li>
              ))}
            </ul>
            </div>
            <div className="col-md-4">
              <button style={{marginTop: 10, marginLeft: 5, marginRight: 15, boxShadow: "1px 2px 4px grey"}} className="btn btn-warning pull-right" onClick={this.openModal}><i className="fa fa-plus"></i> Create Post</button>
            </div>
          </div>
        <hr />

        <div className="container">
          <div className="row margin-top-10">
            <div className="col-md-2">
              <label className="control-label">Order By:</label>
              <select className="form-control" value={this.state.sortBy} onChange={this.xSort}>
                <option value="voteScore">Vote Score</option>
                <option value="timestamp">TimeStamp</option>
              </select>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <PostList posts={this.state.posts} />
            </div>
          </div>
        </div>


        <Modal isOpen={this.state.openModal} contentLabel="Create Modal">
          <i className="fa fa-close pull-right" onClick={this.closeModal}></i>
          <div className="row">
            <div className="col-md-12">
              <h4>Add New Post</h4>
              <form onSubmit={this.createPost}>
                <div className="form-group">
                  <label>Title</label>
                  <input type="text" className="form-control" id="title" placeholder="Enter title" value={this.state.newPost.title} onChange={this.handleChange} required={true}/>
                </div>
                <div className="form-group">
                  <label>Body</label>
                  <textarea className="form-control" id="body" placeholder="Content of your post"  onChange={this.handleChange} required={true}/>
                </div>
                <div className="form-check">
                  <label>Categories: </label>
                  <select className="form-control" id="category" defaultValue={this.state.newPost.category} onChange={this.handleChange} required={true}>
                    {this.props.categories.map(category => (
                      <option value={category.name} key={category.path}>{category.name}</option>
                    ))}
                  </select>
                </div>
                <button type="submit" className="btn btn-warning">Create Post</button>
              </form>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    posts: HELPERS.sort(state.posts),
    sortBy: 'voteScore',
    categories: state.categories
  }
}

function mapDispatchToProps(dispatch) {
  let actions = { ...COMMENT, ...POST}
  return {actions: bindActionCreators(actions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsPage);
