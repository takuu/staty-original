import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default class PostsList extends React.Component {
  static propTypes = {
    posts: PropTypes.array
  }

  render() {
    return (
      <div styleName="wrapper">
        {this.props.posts
          .filter(item => item.published)
          .map(post => {
            return (
              <div key={post.id}>
                <Link to={`/posts/${post.id}`}>
                  <h2 className="post-header-link">{post.title}</h2>
                </Link>
              </div>
            );
          })}
      </div>
    );
  }
}
