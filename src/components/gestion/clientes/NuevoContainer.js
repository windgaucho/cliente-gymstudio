import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query, Mutation } from 'react-apollo';
import moment from 'moment';

import FormCliente from './FormCliente';
import getTiposAbonos from '../../../graphql/querys/getTiposAbonos.graphql';
import CREATE_CLIENTE from '../../../graphql/mutations/createCliente.graphql';
import Loading from '../../common/Loading';
import FieldError from '../../common/FieldError';

class NuevoContainer extends Component {
  state = {
    cliente: {
      fechaIngreso: moment(),
    },
    error: {},
  };

  componentDidMount() {
    const cliente = { ...this.state.cliente };
    cliente.idSucursal = this.props.usuario.idSucursal;
    this.setState({ cliente });
  }

  onChange = (field) => {
    this.setState({
      cliente: { ...this.state.cliente, ...field },
    });
  }

  render() {
    const { cliente } = this.state;
    const { usuario } = this.props;

    return (
      <Query query={getTiposAbonos} variables={{ idSucursal: usuario.idSucursal }}>
        {({ loading, error, data }) => {
          if (loading) {
            return <Loading />;
          }
          if (error) {
            return <FieldError mensaje={error.message} />;
          }
          return (
            <Mutation
              mutation={CREATE_CLIENTE}
              variables={{ cliente }}
            >
              {createCliente => (
                <FormCliente
                  tiposAbonos={data.tiposAbonos}
                  onSubmit={createCliente}
                  onChange={this.onChange}
                  cliente={cliente}
                />
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

NuevoContainer.propTypes = {
  usuario: PropTypes.object.isRequired,
};

export default NuevoContainer;
