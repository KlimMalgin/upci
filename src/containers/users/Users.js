
import React from 'react';
import {
  usersRequest,
  filterByUsername,
} from '../../reducers/users';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardTitle, CardText, Fa, Container } from 'mdbreact';

class Users extends React.Component {
    constructor(props) {
        super();
        this.props = props;
    }

    componentDidMount() {
        this.props.usersRequest();
    }

    renderUserCard({ id, name }) {
        return (<Card className="mb-md-0 mb-4 user-card" key={id}>
                    <CardBody>
                      <Link to={`user/${id}`}><CardTitle className="user-card-title">{name}</CardTitle></Link>
                      <a className="card-meta">Friends</a>
                      <CardText>Anna is a web designer living in New York.</CardText>
                      <hr/>
                      <p className="card-meta float-right">Joined in 2012</p>
                    </CardBody>
                </Card>);
    }

    handleChange(e) {
        this.props.filterByUsername(e.target.value);
    }

    usersFilter(user) {
        if (this.props.filter && this.props.filter.length) {
            return user.name.toLowerCase().indexOf(this.props.filter.toLowerCase()) >= 0;
        }

        return true;
    }

    render() {
        const spinnerClass = `spinner ${this.props.inProcess ? 'show' : ''}`;

        return (
          <Container style={{ maxWidth: '80%' }}>
            <h3>Users</h3>
            <input
              className="form-control mr-sm-2 mb-0"
              type="text"
              placeholder="Type username"
              value={this.props.filter}
              onChange={this.handleChange.bind(this)} />
            <Fa icon="spinner" list spin size="3x" className={spinnerClass}/>
            {this.props.users.filter(this.usersFilter.bind(this)).map(this.renderUserCard)}
          </Container>
        );
    }
}

const mapStateToProps = state => ({
    users     : state.users.users,
    filter    : state.users.usernameFilter,
    favorite  : state.users.favorite,
    inProcess : state.users.inProcess,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
      {
          usersRequest,
          filterByUsername,
      },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Users);
