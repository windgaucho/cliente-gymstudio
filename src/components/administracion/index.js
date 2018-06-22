import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import Sucursales from './sucursales/SucursalesContainer';

class Index extends React.PureComponent {
  render() {
    return (
      <Switch>
        <Route
          exact
          path={`${this.props.match.url}/sucursales`}
          component={Sucursales}
        />
      </Switch>
    );
  }
}

Index.propTypes = {
  match: PropTypes.object.isRequired,
};

export default Index;
