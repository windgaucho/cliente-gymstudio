import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router-dom';
import RutaAutenticada from '../auth/RutaAutenticada';

import Clientes from './clientes/ClientesContainer';

class Index extends React.PureComponent {
  render() {
    return (
      <Switch>
        <RutaAutenticada
          exact
          path={`${this.props.match.url}/clientes`}
          component={Clientes}
          {...this.props}
        />
      </Switch>
    );
  }
}

Index.propTypes = {
  match: PropTypes.object.isRequired,
};

export default Index;
