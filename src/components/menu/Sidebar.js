import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

const SubMenu = Menu.SubMenu;

class Sidebar extends Component {
  render() {
    return (
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
    );
  }
}

export default Sidebar;
