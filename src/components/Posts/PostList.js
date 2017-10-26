import React from 'react'
import Post from "./Post";

class PostList extends React.Component
{
  render() {
    return (
      <div>
        {this.props.posts ? this.props.posts.map(post => (
          <Post post={post} key={post.id}/>
        )) : []}
      </div>
    )
  }
}
export default PostList