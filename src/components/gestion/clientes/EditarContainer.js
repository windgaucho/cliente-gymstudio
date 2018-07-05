import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import getCliente from '../../../graphql/querys/getCliente.graphql';
import getTiposAbonos from '../../../graphql/querys/getTiposAbonos.graphql';
import Loading from '../../common/Loading';
import FieldError from '../../common/FieldError';
import Editar from './Editar';

class EditarContainer extends Component {
  state = {
    cliente: {},
    error: '',
  };

  onCompleted = (data) => {
    // console.log('onCompleted', data);
  }

  onSubmit = () => {
    const { cliente } = this.state;
    this.props.updatecliente({
      variables: { cliente },
    })
      .then(() => this.props.history.push('/gestion/clientes'))
      .catch(error => this.setState({ error: error.message }));
  }

  cancelar = () => {
    this.props.history.goBack();
  }

  render() {
    // const { cliente, error } = this.state;
    const { match } = this.props;
    return (
      <Query query={getCliente} variables={{ id: match.params.id }} onCompleted={this.onCompleted}>
        {(queryCliente) => {
          if (queryCliente.loading) {
            return <Loading />;
          }
          if (queryCliente.error) {
            return <FieldError mensaje={queryCliente.error.message} />;
          }
          const { cliente } = queryCliente.data;
          return (
            <Query query={getTiposAbonos} variables={{ idSucursal: cliente.idSucursal }}>
              {(queryTiposAbonos) => {
                if (queryTiposAbonos.loading) {
                  return <Loading />;
                }
                if (queryTiposAbonos.error) {
                  return <FieldError mensaje={queryTiposAbonos.error.message} />;
                }
                return (
                  <Editar
                    tiposAbonos={queryTiposAbonos.data.tiposAbonos}
                    cliente={queryCliente.data.cliente}
                  />
                );
              }}
            </Query>
          );
        }}
      </Query>
    );
  }
}

EditarContainer.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default EditarContainer;
