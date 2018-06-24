import React, { Component } from 'react';
import { Menu, Icon, Layout } from 'antd';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';

import getUsuario from '../../graphql/querys/getUsuario.graphql';

const SubMenu = Menu.SubMenu;
const { Sider } = Layout;
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

class Sidebar extends Component {
  render() {
    const { data } = this.props;
    if (data.loading) {
      return <div />;
    }
    if (!data.user) {
      return <div />;
    }
    const { menuCollapsed } = this.props;
    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={menuCollapsed}
      >
        <div style={style.logo}>
          <p style={style.logoText}>GymStudio</p>
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <SubMenu
            key="administracion"
            title={<span><Icon type="setting" /><span>Administración</span></span>}
          >
            <Menu.Item key="sucursales">
              <Link to="/administracion/sucursales">Sucursales</Link>
            </Menu.Item>
            <Menu.Item key="rubros">
              <Link to="/administracion/rubros">Rubros</Link>
            </Menu.Item>
            <Menu.Item key="articulos">
              <Link to="/administracion/articulos">Articulos</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="clientes"
            title={<span><Icon type="user" /><span>Clientes</span></span>}
          >
            <Menu.Item key="admClientes">
              <Link to="/clientes/gestion">Gestión</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="movimientos"
            title={<span><Icon type="user" /><span>Movimientos</span></span>}
          >
            <Menu.Item key="gastos">
              <Link to="/movimientos/gastos">Gastos</Link>
            </Menu.Item>
            <Menu.Item key="ventas">
              <Link to="/movimientos/ventas">Ventas</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    );
  }
}

export default graphql(getUsuario, {
  options: () => ({
    fetchPolicy: 'network-only',
  }),
})(Sidebar);
