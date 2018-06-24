import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Layout } from 'antd';
import { graphql } from 'react-apollo';

import Breadcrumbs from '../common/Breadcrumbs';
import getUsuario from '../../graphql/querys/getUsuario.graphql';

const { Header } = Layout;

class AppHeader extends Component {
  render() {
    const { data } = this.props;
    if (data.loading) {
      return <div />;
    }
    if (!data.user) {
      return <div />;
    }
    const { menuCollapsed, toggleMenu } = this.props;
    return (
      <div>
        <Header style={{ background: '#fff', padding: 0 }}>
          <Icon
            className="trigger"
            type={menuCollapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={toggleMenu}
          />
        </Header>

        <div style={{ marginLeft: 24 }}>
          <Breadcrumbs />
        </div>
      </div>
    );
  }
}

AppHeader.propTypes = {

};

export default graphql(getUsuario)(AppHeader);
