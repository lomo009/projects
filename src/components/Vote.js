import React from 'react'
import {bindActionCreators} from "redux";
import * as POST from '../actions/posts'
import * as COMMENT from '../actions/comments'
import {connect} from "react-redux";

class Vote extends React.Component {
  upVote = e => {
    e.preventDefault()
    switch (this.props.type) {
      case "post":
        return this.props.actions.addVote(this.props.id)
      case "comment":
        return this.props.actions.addCommentVote(this.props.id)
      default:
        console.log("No proper vote method call!")
    }
  }

  downVote = e => {
    e.preventDefault()
    switch (this.props.type) {
      case "post":
        return this.props.actions.subtractVote(this.props.id)
      case "comment":
        return this.props.actions.subtractCommentVote(this.props.id)
      default:
        console.log("No proper vote method call!")
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      size: nextProps.size,
      id: nextProps.id,
      type: nextProps.type
    })
  }


  render () {
    return (
      <div className="row">
        <div className="col-md-12">
          <button className="btn btn-success btn-sm" style={{height: this.props.size, width: this.props.size, lineHeight:0, boxShadow: "1px 2px 4px grey"}} onClick={this.upVote} >
            <i className="fa fa-plus" style={{fontSize: 10, marginLeft: -3, position: "absolute", marginTop: -5}}></i>
          </button>
          <button className="btn btn-danger btn-sm" style={{height: this.props.size, width: this.props.size, lineHeight:0, marginLeft:10, boxShadow: "1px 2px 4px grey"}} onClick={this.downVote} >
            <i className="fa fa-minus" style={{fontSize: 10, marginLeft: -3, position: "absolute", marginTop: -5}}></i>
          </button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state
}
function mapDispatchToProps(dispatch) {
  let actions = {...POST, ...COMMENT};
  return {actions: bindActionCreators(actions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Vote)