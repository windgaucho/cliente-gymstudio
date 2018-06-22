import React from 'react';
import { withRouter } from 'react-router-dom';
import { Breadcrumb } from 'antd';

class Breadcrumbs extends React.Component {
  renderBreadcrumbs = () => {
    const breadcrumbs = this.props.location.pathname.split('/');
    return breadcrumbs.map(b => {
      const strBreadcrumb = b.charAt(0).toUpperCase() + b.slice(1);
      if (b) {
        return (
          <Breadcrumb.Item key={`bread-${b}`}>
            {strBreadcrumb}
          </Breadcrumb.Item>
        );
      }
    });
  }

  render() {
    return (
      <Breadcrumb style={{ margin: '16px 0' }}>
        {this.renderBreadcrumbs()}
      </Breadcrumb>
    );
  }
}

export default withRouter(Breadcrumbs);
