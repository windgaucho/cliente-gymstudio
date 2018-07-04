import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Mutation } from 'react-apollo';
import moment from 'moment';

import FormCliente from './FormCliente';
import UPDATE_CLIENTE from '../../../graphql/mutations/updateCliente.graphql';

class Editar extends Component {
  state = {
    cliente: {},
  };

  static getDerivedStateFromProps(props, state) {
    if (isEmpty(state.cliente)) {
      const cliente = { ...props.cliente };
      return {
        cliente: {
          idSucursal: cliente.idSucursal,
          id: cliente.id,
          docId: cliente.docId,
          apellido: cliente.apellido,
          nombre: cliente.nombre,
          domicilio: cliente.domicilio,
          telefono: cliente.telefono,
          contacto: cliente.contacto,
          email: cliente.email,
          sexo: cliente.sexo,
          fechaNacimiento: moment(cliente.fechaNacimiento),
          fechaIngreso: moment(cliente.fechaIngreso),
          observaciones: cliente.observaciones,
          idTipoAbono: cliente.idTipoAbono,
        },
      };
    }
    return null;
  }

  onChange = (field) => {
    this.setState({
      cliente: { ...this.state.cliente, ...field },
    });
  }

  render() {
    const { tiposAbonos } = this.props;
    const { cliente } = this.state;
    return (
      <Mutation
        mutation={UPDATE_CLIENTE}
        variables={{ cliente }}
      >
        {updatecliente => (
          <FormCliente
            tiposAbonos={tiposAbonos}
            cliente={cliente}
            onSubmit={updatecliente}
            onChange={this.onChange}
          />
        )}
      </Mutation>
    );
  }
}

Editar.propTypes = {
  cliente: PropTypes.object.isRequired,
};

export default Editar;
