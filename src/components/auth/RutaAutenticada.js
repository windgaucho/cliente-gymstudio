import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { graphql } from 'react-apollo';

import getUsuario from '../../graphql/querys/getUsuario.graphql';
import Loading from '../common/Loading';
import { hasRole } from './helpersAuth';

class RutaAutenticada extends React.Component {
  constructor(props) {
    super(props);
    this.renderRuta = this.renderRuta.bind(this);
  }

  renderRuta(props) {
    const { data, roles } = this.props;
    if (data.error) {
      console.log('ERROR:', data.error);
    }

    const Component = this.props.component;
    if (data.user) {
      let auth = true;
      if (roles) {
        auth = hasRole(data.user, roles);
      }
      if (auth) {
        return (
          <Component
            usuario={data.user}
            {...props}
          />
        );
      }
      return <Redirect to="/" />;
    }
    return <Redirect to="/login" />;
  }

  render() {
    const { data } = this.props;
    if (data.loading) {
      return <Loading />;
    }

    const { component, ...resto } = this.props;
    return (
      <Route
        {...resto}
        render={this.renderRuta}
      />
    );
  }
}

RutaAutenticada.propTypes = {
  component: PropTypes.func.isRequired,
  data: PropTypes.object,
};

export default graphql(getUsuario, {
  options: () => ({
    fetchPolicy: 'network-only',
  }),
})(RutaAutenticada);
