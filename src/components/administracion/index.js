import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import Sucursales from './sucursales/SucursalesContainer';
import NuevaSucursal from './sucursales/NuevoContainer';
import EditarSucursal from './sucursales/EditarContainer';
import Rubros from './rubros/RubrosContainer';
import NuevoRubro from './rubros/NuevoContainer';
import EditarRubro from './rubros/EditarContainer';
import Articulos from './articulos/ArticulosContainer';
import NuevoArticulo from './articulos/NuevoContainer';
import EditarArticulo from './articulos/EditarContainer';
import TiposAbonos from './tipos_abonos/TiposAbonosContainer';
import NuevoTipoAbono from './tipos_abonos/NuevoContainer';
import EditarTipoAbono from './tipos_abonos/EditarContainer';

class Index extends React.PureComponent {
  render() {
    return (
      <Switch>
        <Route
          exact
          path={`${this.props.match.url}/sucursales`}
          component={Sucursales}
        />
        <Route
          exact
          path={`${this.props.match.url}/sucursales/nuevo`}
          component={NuevaSucursal}
        />
        <Route
          exact
          path={`${this.props.match.url}/sucursales/editar/:id`}
          component={EditarSucursal}
        />
        <Route
          exact
          path={`${this.props.match.url}/rubros`}
          component={Rubros}
        />
        <Route
          exact
          path={`${this.props.match.url}/rubros/nuevo`}
          component={NuevoRubro}
        />
        <Route
          exact
          path={`${this.props.match.url}/rubros/editar/:id`}
          component={EditarRubro}
        />
        <Route
          exact
          path={`${this.props.match.url}/articulos`}
          component={Articulos}
        />
        <Route
          exact
          path={`${this.props.match.url}/articulos/nuevo`}
          component={NuevoArticulo}
        />
        <Route
          exact
          path={`${this.props.match.url}/articulos/editar/:id`}
          component={EditarArticulo}
        />
        <Route
          exact
          path={`${this.props.match.url}/tipos_abonos`}
          component={TiposAbonos}
        />
        <Route
          exact
          path={`${this.props.match.url}/tipos_abonos/nuevo`}
          component={NuevoTipoAbono}
        />
        <Route
          exact
          path={`${this.props.match.url}/tipos_abonos/editar/:id`}
          component={EditarTipoAbono}
        />
      </Switch>
    );
  }
}

Index.propTypes = {
  match: PropTypes.object.isRequired,
};

export default Index;
