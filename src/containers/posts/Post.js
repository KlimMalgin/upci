
import React from 'react';
import {
  postsRequest,
} from '../../reducers/posts';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardTitle, CardText, Fa, Container } from 'mdbreact';
import { Comments } from '../comments';

class Post extends React.Component {
    constructor(props) {
        super();
        this.state = { postId: +props.match.params.id };
        this.props = props;
    }

    componentDidMount() {
        this.props.postsRequest();
    }

    currentPost() {
        let post = this.props.posts.find(item => item.id == this.state.postId) || {};

        return post;
    }

    filterById(post) {
        if (this.props.user && this.props.user.id > -1) {
            return post.userId === this.props.user.id;
        }
        else {
            return true;
        }
    }

    render() {
        const post = this.currentPost();

        return (
          <Container style={{ maxWidth: '80%' }}>
              <h3>Post</h3>
             <Card className="mb-md-0 mb-4 post-card">
                <CardBody>
                  <CardTitle>{post.title}</CardTitle>
                  <CardText>{post.body}</CardText>
                </CardBody>
             </Card>
             <Comments post={post} paginator={false} />
          </Container>
        );
    }
}

const mapStateToProps = state => ({
    posts     : state.posts.posts,
    inProcess : state.posts.inProcess,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
      { postsRequest },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Post);
