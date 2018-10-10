
import React from 'react';
import {
  commentsRequest,
  toggleFavorite,
  changePage,
  changeIPP,
} from '../../reducers/comments';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// import { Link } from 'react-router-dom';
import { Card, CardBody, CardTitle, CardText, Fa, Container } from 'mdbreact';
import Paginator from '../paginator';

class Comments extends React.Component {
    constructor(props) {
        super();
        this.props = props;
    }

    componentDidMount() {
        this.props.commentsRequest();
    }

    isFavorite(comment) {
        return this.props.favorite[comment.id];
    }

    isNotFavorite(comment) {
        return !this.isFavorite(comment);
    }

    toggleFavorite(comment) {
        this.props.toggleFavorite(comment);
    }

    renderCommentCard(comment) {
        const { id, name, body, email } = comment;

        return (<Card className="mb-md-0 mb-4 comment-card" key={id}>
                    <CardBody>
                      <CardTitle>{name}</CardTitle>
                      Добавить в избранное: <Fa icon={this.isFavorite(comment) ? 'check-square' : 'square'} onClick={this.toggleFavorite.bind(this, comment)}/>
                      <br />
                      <span className="card-text">Email: {email}</span>
                      <CardText>
                        {body}
                      </CardText>
                    </CardBody>
                </Card>);
    }

    // Показываем посты только для текущего пользователя, если это страница пользователя, либо все, если это /page
    filterById(comment) {
        if (this.props.post && this.props.post.id > -1) {
            return comment.postId === this.props.post.id;
        }
        else {
            return true;
        }
    }

    // Выбираем комменты текущей страницы
    getRangeComments() {
        const start = this.props.activePage * this.props.itemsPerPage;
        const end = start + this.props.itemsPerPage;
        let comments = [];

        if (this.props.paginator !== false && this.props.comments.length > end) {
            comments = this.props.comments.slice(start, end);
        }
        else {
            comments = this.props.comments;
        }

        return comments.filter(this.filterById.bind(this));
    }

    render() {
        const spinnerClass = `spinner ${this.props.inProcess ? 'show' : ''}`;
        const comments = this.getRangeComments();

        return (
          <Container style={{ maxWidth: '80%' }}>
            <h3>Comments</h3>
            <Paginator
              show={this.props.paginator}
              active={this.props.activePage}
              changePage={this.props.changePage}
              pageCount={this.props.pageCount}
              changeIPP={this.props.changeIPP} />
            <Fa icon="spinner" list spin size="3x" className={spinnerClass}/>
            {comments.filter(this.isFavorite.bind(this)).map(this.renderCommentCard.bind(this))}
            {comments.filter(this.isNotFavorite.bind(this)).map(this.renderCommentCard.bind(this))}
          </Container>
        );
    }
}

const mapStateToProps = state => ({
    comments     : state.comments.comments,
    activePage   : state.comments.activePage,
    itemsPerPage : state.comments.itemsPerPage,
    pageCount    : state.comments.pageCount,
    favorite     : state.comments.favorite,
    inProcess    : state.comments.inProcess,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
      {
          commentsRequest,
          toggleFavorite,
          changePage,
          changeIPP,
      },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
