import React from 'react';
import { Navbar, NavbarBrand, NavbarNav, Collapse, NavItem, NavLink } from 'mdbreact';
import { Route } from 'react-router-dom';

import { Users, UserInfo } from '../users';
import { Posts, Post } from '../posts';
import { Comments } from '../comments';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { collapse: false };
    }

    render() {
        return (
            <main style={ { height: '100vh' } }>

                <Navbar color="indigo" dark expand="md" scrolling>
                    <NavbarBrand href="/">
                        <strong>UPCI</strong>
                    </NavbarBrand>

                    <Collapse isOpen = { this.state.collapse } navbar>
                        <NavbarNav left>
                          <NavItem>
                              <NavLink to="/posts">Posts</NavLink>
                          </NavItem>
                          <NavItem>
                              <NavLink to="/users">Users</NavLink>
                          </NavItem>
                          <NavItem>
                              <NavLink to="/comments">Comments</NavLink>
                          </NavItem>

                        </NavbarNav>
                    </Collapse>
                </Navbar>

                <Route exact path="/" component={Users} />
                <Route exact path="/users" component={Users} />
                <Route exact path="/user/:id" component={UserInfo} />

                <Route exact path="/posts" component={Posts} />
                <Route exact path="/post/:id" component={Post} />
                <Route exact path="/comments" component={Comments} />
            </main>

        );
    }
}

export default App;
