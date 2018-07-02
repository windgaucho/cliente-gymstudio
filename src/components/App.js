import React, { Component } from 'react';
import { Layout } from 'antd';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import RutaAutenticada from './auth/RutaAutenticada';
import Sidebar from './menu/Sidebar';
import Header from './common/Header';
import Home from './common/Home';
import Administracion from './administracion';
import Gestion from './gestion/Index';

import Login from '../components/auth/LoginContainer';
import Logout from '../components/auth/Logout';

// import Clientes from './clientes';
// import Movimientos from './movimientos';

const { Content, Footer } = Layout;

class App extends Component {
  state = {
    menuCollapsed: false,
  };

  toggleMenu = () => {
    this.setState({ menuCollapsed: !this.state.menuCollapsed });
  }

  render() {
    return (
      <Router basename="/">
        <Layout id="app-header" style={{ minHeight: '100vh' }}>
          <Sidebar
            menuCollapsed={this.state.menuCollapsed}
          />
          <Layout>
            <Header
              menuCollapsed={this.state.menuCollapsed}
              toggleMenu={this.toggleMenu}
            />
            <Content style={{ margin: '0px 16px', padding: 24, background: '#fff', minHeight: 480 }}>
              <div style={{ padding: 24 }}>
                <Switch>
                  <Route exact path="/login" component={Login} {...this.props} />
                  <Route exact path="/logout" component={Logout} {...this.props} />
                  <RutaAutenticada
                    exact
                    path="/"
                    component={Home}
                    {...this.props}
                  />
                  <RutaAutenticada
                    path="/administracion"
                    component={Administracion}
                    {...this.props}
                  />
                  <RutaAutenticada
                    path="/gestion"
                    component={Gestion}
                    {...this.props}
                  />
                </Switch>
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              GymStudio - 2018 - Windgaucho
            </Footer>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default App;
