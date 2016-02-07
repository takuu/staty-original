import React, { PropTypes } from 'react';

export default class SinglePost extends React.Component {
  static propTypes = {
    post: PropTypes.object
  }

  render() {
    const { post } = this.props;

    if (!post) return null;

    const { title, content, userId } = post;

    return (
      <div styleName="wrapper">
        <div styleName="title">{title}</div>
        <p>{content}</p>
        <small>written by {userId}</small>
      </div>
    );
  }
}
