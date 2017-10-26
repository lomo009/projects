import React from 'react'
import logo from '../../r-icon.png'
import Comments from "../Comments";
import * as POST from '../../actions/posts'
import * as COMMENT from '../../actions/comments'
import * as HELPERS from "../../utils/helpers";
import * as CATEGORY from "../../actions/categories";
import Vote from "../Vote";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Modal from 'react-modal'
import {Redirect} from 'react-router'
import {Link} from 'react-router-dom'

class Post extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.deletePost = this.deletePost.bind(this);
    // this.closeModal = this.closeModal.bind(this)
    // this.handleChange = this.handleChange.bind(this)
  }

  state = {
    editPost: {
      'title': '',
      'body': '',
      'category': ''
    },
    isEditing: false,
    categories: [],
    openModal: false
  }
  
  componentWillMount(){
    this.props.actions.loadCommentsById(this.props.post.id)
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.post) {
      this.setState(prevState => ({
        post: nextProps.post,
        showBody: nextProps.showBody,
        showComment: nextProps.showComment,
        comments: nextProps.comments,
        categories: nextProps.categories
      }))
    } else {
      this.setState({
        post: null,
        showBody: false,
        showComment: false,
        categories: nextProps.categories,
        comments: nextProps.comments
      })
    }
  }

  deletePost (e) {
    e.preventDefault()
    let postId = e.target.id
    this.props.actions.removePost(postId)
  }

  editPost = (e) => {
    e.preventDefault()
    let copyPost = this.props.post
    this.setState({
      editPost: copyPost,
      isEditing: true,
      openModal: true
    })
  }

  closeModal = (e) => {
    e.preventDefault()
    this.setState({
      openModal: false
    })
  }

  handleChange = (e) => {
    let key = e.target.id
    let editPost = this.state.editPost
    editPost[key] = e.target.value
    this.setState({
      editPost: editPost
    })
  }
  savePost = (e) => {
    e.preventDefault()
    this.props.actions.editPost(this.state.editPost)
    this.setState({
      editPost: {},
      openModal: false
    })
  }

  render() {
    if (this.props.post) {
      return (
        <div>
        <div className="row">
          <div className="col-md-12">
            <div className="card" key={this.props.post.id} style={{marginTop: 20, boxShadow: "1px 2px 4px grey"}}>
              <div className="card-header"  style={{boxShadow: "1px 2px 4px grey"}}>
                <div className="btn-group pull-right">
                  <button className="btn btn-info btn-sm" id={this.props.post.id} onClick={this.editPost} style={{boxShadow: "1px 2px 4px grey"}}><i className="fa fa-pencil"></i></button>
                  <button className="btn btn-danger btn-sm" id={this.props.post.id} onClick={this.deletePost} style={{boxShadow: "1px 2px 4px grey"}}><i className="fa fa-trash"></i></button>
                </div>
                 <div className="card-title"  style={{marginTop: 10}}>
                 <div className="row">
                    <div className="col-md-1">
                      <img src={logo} className="App-logo" alt="logo" style={{alignItems: 'center', justifyContent: 'center', alignSelf: 'center', height: 75, width: 75}} />
                    </div>
                    <div className="col-md-11">
                      <h2 style={{marginTop: 20}}><a href={'/'+this.props.post.category+'/'+this.props.post.id}>{this.props.post.title}</a></h2>
                    </div>
                  </div>
                </div>
              </div>
              { this.props.showBody? <h4 style={{textAlign: "center", margin: 20}}>{this.props.post.body}</h4> : ''}
              <div className="card-body" style={{alignSelf: "center", width:"33%"}}>
                <div className="card" style={{marginTop: 10, boxShadow: "1px 2px 4px grey", alignSelf: "center"}}>
                  <div className="card-block" style={{alignSelf: "center", padding: 15}}>
                    <hr />
                    <p style={{textAlign: "center", fontSize:"54px", marginBottom:0, textShadow: "1px 2px 4px grey"}}><strong>{this.props.post.voteScore}</strong></p>
                    <h4 className="text-muted" style={{textAlign: "center"}}>Votes</h4>
                    <hr />
                    <Vote size={36} id={this.props.post.id} type={"post"} />
                  </div>
                </div>
              </div>
               <div className="row margin-top-10" style={{alignSelf: "center", marginLeft: 10, marginBottom: 10}}>
                  <div className="col-md-12">
                    {this.props.comments[this.props.post.id] !== undefined ?
                      <h4>Comments: <span className="badge badge-success">{this.props.comments[this.props.post.id].length}</span></h4>
                      : 0}
                  </div>
                </div>
              <div className="card-footer text-muted">
                <h5 className="card-subtitle mb-2" style={{paddingTop: 20}}>By: <strong>{this.props.post.author}</strong><span className="text-muted" style={{fontSize: 16}}>  {HELPERS.timestamp(this.props.post.timestamp)}</span></h5>
              </div>
            </div>
             {this.props.comments && this.props.showComments ? <div className="card-footer">
                <Comments comments={this.props.comments[this.props.post.id]} post={this.props.post} />
              </div>: ""}
          </div>
        </div>
            <Modal isOpen={this.state.openModal} contentLabel="Create Modal">
              <i className="fa fa-close pull-right" onClick={this.closeModal}></i>
              <div className="row">
                <div className="col-md-12">
                  <h4>Edit Post</h4>
                  <form onSubmit={this.savePost}>
                    <div className="form-group">
                      <label>Title</label>
                      <input type="text" className="form-control" id="title" placeholder="Enter title" onChange={this.handleChange} value={this.state.editPost.title} required={true}/>
                    </div>
                    <div className="form-group">
                      <label>Body</label>
                      <textarea className="form-control" id="body" placeholder="Content of your post"  onChange={this.handleChange} value={this.state.editPost.body} required={true}/>
                    </div>
                    <div className="form-check">
                      <label>Categories: </label>
                      <select className="form-control" id="category" value={this.state.editPost.category} onChange={this.handleChange} required={true}>
                        {this.props.categories.map(category => (
                          <option value={category.name} key={category.path}>{category.name}</option>
                        ))}
                      </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Update Post</button>
                  </form>
                </div>
              </div>
            </Modal>
          </div>
      )
    }
    return (
      <Redirect to={"/"} />
    )
  }
}


function mapStateToProps(state) {
  return {
    categories: state.categories,
    comments: state.comments
  }
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators({ ...POST, ...COMMENT, ...CATEGORY }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);