
import React from 'react';
import {
  postsRequest,
  toggleFavorite,
  changePage,
  changeIPP,
} from '../../reducers/posts';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardTitle, CardText, Fa, Container } from 'mdbreact';
import Paginator from '../paginator';

class Posts extends React.Component {
    constructor(props) {
        super();
        this.props = props;
    }

    componentDidMount() {
        this.props.postsRequest();
    }

    getUser(userId) {
        if (this.props.user) {
            return this.props.user;
        }
        else {
            return this.props.users.find(item => item.id === userId) || {};
        }
    }

    isFavorite(post) {
        return this.props.favorite[post.id];
    }

    isNotFavorite(post) {
        return !this.isFavorite(post);
    }

    toggleFavorite(post) {
        this.props.toggleFavorite(post);
    }

    renderPostCard(post) {
        const { id, title, body, userId } = post;
        const user = this.getUser(userId);

        return (<Card className="mb-md-0 mb-4 post-card" key={id}>
                    <CardBody>
                      <Link to={`/post/${id}`}><CardTitle>{title}</CardTitle></Link>
                      Добавить в избранное: <Fa icon={this.isFavorite(post) ? 'check-square' : 'square'} onClick={this.toggleFavorite.bind(this, post)}/>
                      <CardText>{body}</CardText>
                      <hr />
                      <span>written by <Link to={`/user/${user.id}`}>{user.name}</Link></span>
                    </CardBody>
                </Card>);
    }

    // Показываем посты только для текущего пользователя, если это страница пользователя, либо все, если это /page
    filterById(post) {
        if (this.props.user && this.props.user.id > -1) {
            return post.userId === this.props.user.id;
        }
        else {
            return true;
        }
    }

    // Выбираем посты текущей страницы
    getRangePosts() {
        const start = this.props.activePage * this.props.itemsPerPage;
        const end = start + this.props.itemsPerPage;
        let posts = [];

        if (this.props.paginator !== false && this.props.posts.length > end) {
            posts = this.props.posts.slice(start, end);
        }
        else {
            posts = this.props.posts;
        }

        return posts.filter(this.filterById.bind(this));
    }

    render() {
        const spinnerClass = `spinner ${this.props.inProcess ? 'show' : ''}`;
        const posts = this.getRangePosts();

        return (
          <Container style={{ maxWidth: '80%' }}>
              <h3>Posts</h3>
              <Paginator
                show={this.props.paginator}
                active={this.props.activePage}
                changePage={this.props.changePage}
                pageCount={this.props.pageCount}
                changeIPP={this.props.changeIPP} />
              <Fa icon="spinner" list spin size="3x" className={spinnerClass}/>
             {posts.filter(this.isFavorite.bind(this)).map(this.renderPostCard.bind(this))}
             {posts.filter(this.isNotFavorite.bind(this)).map(this.renderPostCard.bind(this))}
          </Container>
        );
    }
}

const mapStateToProps = state => ({
    posts        : state.posts.posts,
    users        : state.users.users,
    activePage   : state.posts.activePage,
    itemsPerPage : state.posts.itemsPerPage,
    pageCount    : state.posts.pageCount,
    favorite     : state.posts.favorite,
    inProcess    : state.posts.inProcess,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
      {
          postsRequest,
          toggleFavorite,
          changePage,
          changeIPP,
      },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
