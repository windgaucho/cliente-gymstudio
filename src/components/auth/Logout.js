import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withApollo } from 'react-apollo';

class Logout extends Component {
  componentWillMount() {
    const { client } = this.props;
    client.resetStore();
  }

  render() {
    return (
      <div>
        <p>Ha finalizado su sesión</p>
      </div>
    );
  }
}

Logout.propTypes = {
  client: PropTypes.object,
  history: PropTypes.object.isRequired,
};

export default withApollo(Logout);
