import React from 'react'
import logo from '../r-icon.png'
import {bindActionCreators} from "redux";
import * as POST from '../actions/posts'
import * as COMMENT from '../actions/comments'
import {connect} from "react-redux";
import * as HELPERS from "../utils/helpers";
import Vote from "./Vote";
import Modal from 'react-modal'

class Comments extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  state = {
    sortBy: 'voteScore',
    editComment: {},
    openModal: false,
    isEditing: false
  }

  createComment = e => {
    e.preventDefault()
    let comment = {
      id: HELPERS.createId(),
      body: e.target.comment.value,
      parentId: this.props.post.id,
      timestamp: Date.now(),
      author: 'elem09',
      voteScore: 1
    }
    this.props.actions.addNewComment(comment)
    e.target.comment.value = ""
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      comments: HELPERS.sort(nextProps.comments[0], this.state.sortBy),
      sortBy: this.state.sortBy
    })
  }

  xSort = (e) => {
    let sortBy = e.target.value
    this.setState({
      comments: HELPERS.sort(this.props.comments[0], sortBy),
      sortBy
    });
  }

  deleteComment  = e => {
    e.preventDefault()
    this.props.actions.removeComment(e.target.id)
  }

  handleChange = (e) => {
    let key = e.target.id
    let editComment = this.state.editComment
    editComment[key] = e.target.value
    this.setState({
      editPost: editComment
    })
  }

  editComment = e => {
    e.preventDefault()
    let commentId = e.target.id
    let comments = this.props.comments[0]
    let comment = comments.filter( currentComment => currentComment.id === commentId)
    this.setState({
      openModal:true,
      editComment: comment[0]
    })
  }

  saveComment = (e) => {
    e.preventDefault()
    this.props.actions.editComment(this.state.editComment)
    this.setState({
      openModal: false,
      newComment: {}
    })
  }

  closeModal = (e) => {
    e.preventDefault()
    this.setState({
      openModal: false
    })
  }

  render () {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card" style={{boxShadow: "1px 2px 4px grey"}}>
            <div className="card-header">
              Leave a Comment
            </div>
             <div className="card-body">
               <form onSubmit={this.createComment} className="margin-top-10">
                <div className="row">
                  <div className="col-md-12">
                    <textarea type="text" required name="comment" placeholder="Enter your comment" className="form-control" rows="3"/>
                  </div>
                  <div className="col-md-12">
                    <button className="btn btn-primary" type="submit" style={{marginTop: 10}}>Comment</button>
                  </div>
                </div>
              </form>
            </div>
          </div>

        
          <div>
            <div className="card" style={{boxShadow: "1px 2px 4px grey", margin: 10}}>
              <div className="card-header">
                Comments:
              </div>
              
                <div className="card-body">
                  <div className="row">
                  <div className="col-md-4 ml-md-auto" style={{margin: 20}}>
                    <label className="control-label">Order By:</label>
                    <select className="form-control sort-by-selection" value={this.state.sortBy} onChange={this.xSort}>
                      <option value="voteScore">Vote Score</option>
                      <option value="timestamp">TimeStamp</option>
                    </select>
                  </div>
                </div>
                
                {this.state.comments ? this.state.comments.map(comment => (
                  <div className="card" key={comment.id} style={{margin: 10, boxShadow: "1px 2px 4px grey"}}>
                    <div className="card-header">
                      <div className="btn-group pull-right">
                        <button className="btn btn-info btn-sm" id={comment.id} onClick={this.editComment} style={{boxShadow: "1px 2px 4px grey"}}><i className="fa fa-pencil"></i></button>
                        <button className="btn btn-danger btn-sm" id={comment.id} onClick={this.deleteComment.bind(this)} style={{boxShadow: "1px 2px 4px grey"}}><i className="fa fa-trash"></i></button>
                      </div>
                    </div>
                    <div className="card-body" style={{alignSelf: "center", width:"100%"}}>
                      <div className="card" style={{marginTop: 10, boxShadow: "1px 2px 4px grey", alignSelf: "center", padding: 10}}>
                      <div className="row">
                        <div className="col-md-1">
                          <img src={logo} className="App-logo" alt="logo" style={{alignItems: 'center', justifyContent: 'center', alignSelf: 'center', height: 50, width: 50}} />
                        </div>
                        <div className="col-md-11">
                          <h4 className="card-title" style={{marginTop: 10, textAlign: "left"}}>{comment.body}</h4>
                        </div>
                      </div>
                      <div className="card-block" style={{alignSelf:"center"}}>
                        <hr />
                        <h3 style={{marginBottom:0, textAlign: "center", textShadow: "1px 1px 2px grey"}}>{comment.voteScore}</h3>
                        <hr />
                        <p className="text-muted" style={{marginBottom:0, textAlign: "center"}}>Votes</p>
                        <Vote size={20} id={comment.id} type={"comment"} />
                      </div>
                      </div>
                        <h6 style={{marginBottom: 4}} className="margin-top-10"><b>{comment.author}:</b>
                          <span className="text-muted">  {HELPERS.timestamp(comment.timestamp)}</span> &nbsp;
                        </h6>
                    </div>
                  </div>
                  )) : []}
                </div>
              </div>
            </div>

              <Modal isOpen={this.state.openModal} contentLabel="Create Modal">
                <i className="fa fa-close pull-right" onClick={this.closeModal}></i>
                <div className="row">
                  <div className="col-md-12">
                    <h4>Edit Comment:</h4>
                    <form onSubmit={this.saveComment}>
                      <div className="form-group">
                        <label>Body</label>
                        <textarea className="form-control" id="body" placeholder="Content of your comment"  onChange={this.handleChange} value={this.state.editComment.body} required={true}/>
                      </div>
                     <button type="submit" className="btn btn-primary">Update Comment</button>
                    </form>
                  </div>
                </div>
              </Modal>
            </div>
          </div>
    )
  }
}

function mapStateToProps({comments}) {
  return {comments: HELPERS.sort(comments)}
}

function mapDispatchToProps(dispatch) {
  let actions = {...POST, ...COMMENT};
  return {actions: bindActionCreators(actions, dispatch)}
}

export default connect(mapStateToProps,mapDispatchToProps)(Comments)