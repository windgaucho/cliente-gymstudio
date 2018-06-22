import React, { Component } from 'react';
import { Layout, Icon } from 'antd';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import Sidebar from './menu/Sidebar';
import Home from './common/Home';
import Administracion from './administracion';
// import Clientes from './clientes';
// import Movimientos from './movimientos';

import Breadcrumbs from './common/Breadcrumbs';

const { Content, Footer, Sider, Header } = Layout;
const style = {
  logo: {
    height: 32,
    background: 'rgba(255,255,255,.2)',
    margin: 16,
    textAlign: 'center',
  },
  logoText: {
    marginLeft: 16,
    fontSize: 20,
    fontWeight: 600,
    color: '#c1c1c1',
  },
};

class App extends Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({ collapsed: !this.state.collapsed });
  }

  render() {
    return (
      <Router basename="/">
        <Layout id="app-header" style={{ minHeight: '100vh' }}>
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
          >
            <div style={style.logo}>
              <p style={style.logoText}>GymStudio</p>
            </div>
            <Sidebar />
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }}>
              <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
            </Header>
            <div style={{ marginLeft: 24 }}>
              <Breadcrumbs />
            </div>
            <Content style={{ margin: '0px 16px', padding: 24, background: '#fff', minHeight: 480 }}>
              <div style={{ padding: 24 }}>
                <Switch>
                  <Route
                    exact
                    path="/"
                    component={Home}
                    {...this.props}
                  />
                  <Route
                    path="/administracion"
                    component={Administracion}
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
