
import React from 'react';
import {
  usersRequest,
} from '../../reducers/users';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Card, CardBody, CardTitle, CardText, Fa, Container } from 'mdbreact';
import { Posts } from '../posts';

class UserInfo extends React.Component {
    constructor(props) {
        super();
        this.state = { userId: +props.match.params.id };
        this.props = props;
    }

    componentDidMount() {
        this.props.usersRequest();
    }

    currentUser() {
        let user = this.props.users.find(item => item.id == this.state.userId) || {};

        return user;
    }

    render() {
        const user = this.currentUser();

        return (
            <Container className="user-info" style={{ maxWidth: '80%' }}>
                <h3>User</h3>
                <Card className="mb-md-0 mb-4" style={{
                    maxWidth : '100%',
                    width    : '100%',
                }}>
                    <CardBody>
                      <CardTitle>{user.name}</CardTitle>
                      <CardText>
                        Email: {user.email}<br />
                        Phone: {user.phone}<br />
                        Website: {user.website}<br />

                      </CardText>
                      <hr/>
                      <p className="card-meta float-right">Joined in 2012</p>
                    </CardBody>
                </Card>
                <Posts user={user} paginator={false} />
            </Container>
        );
    }
}

// export default UserInfo;

const mapStateToProps = state => ({
    users     : state.users.users,
    favorite  : state.users.favorite,
    inProcess : state.users.inProcess,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
      { usersRequest },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
