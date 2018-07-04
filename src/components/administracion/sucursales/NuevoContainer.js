import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';

import FormSucursal from './FormSucursal';
import createSucursal from '../../../graphql/mutations/createSucursal.graphql';
import queryCiudades from '../../../graphql/querys/getCiudades.graphql';
import querySucursales from '../../../graphql/querys/getSucursales.graphql';
import Loading from '../../common/Loading';

class NuevoContainer extends Component {
  state = {
    sucursal: {
      nombre: '',
      idCiudad: '',
    },
    error: {},
  };

  onSubmit = () => {
    const { sucursal } = this.state;
    this.props.crearSucursal({
      variables: { sucursal },
    })
      .then(() => {
        this.props.history.push('/administracion/sucursales');
      })
      .catch(error => this.setState({ error: error.message }));
  }

  onChange = (field) => {
    this.setState({
      sucursal: { ...this.state.sucursal, ...field },
    });
  }

  onCancel = () => {
    this.props.history.push('/administracion/sucursales');
  }

  render() {
    const { getCiudades } = this.props;
    if (getCiudades.loading) {
      return <Loading />;
    }

    return (
      <div>
        <FormSucursal
          ciudades={getCiudades.ciudades}
          sucursal={this.state.sucursal}
          onSubmit={this.onSubmit}
          onCancel={this.onCancel}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

NuevoContainer.propTypes = {
  crearSucursal: PropTypes.func,
};

export default compose(
  graphql(createSucursal,
    { name: 'crearSucursal',
      options: {
        refetchQueries: [{
          query: querySucursales,
        }],
      },
    }),
  graphql(queryCiudades,
    { name: 'getCiudades',
    })
)(NuevoContainer);
