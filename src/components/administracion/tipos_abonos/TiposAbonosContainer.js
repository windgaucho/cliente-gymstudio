import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Query, Mutation } from 'react-apollo';

import TiposAbonos from './TiposAbonos';
import getTiposAbonos from '../../../graphql/querys/getTiposAbonos.graphql';
import REMOVE_TIPO_ABONO from '../../../graphql/mutations/removeTipoAbono.graphql';
import Loading from '../../common/Loading';
import FieldError from '../../common/FieldError';

class TiposAbonosContainer extends Component {
  state = {
    error: '',
  };

  nuevo = () => {
    this.props.history.push('/administracion/tipos_abonos/nuevo');
  }

  editar = (e) => {
    const { id } = e.target;
    this.props.history.push(`/administracion/tipos_abonos/editar/${id}`);
  }

  render() {
    const { idSucursal } = this.props;

    return (
      <Query query={getTiposAbonos} variables={{ idSucursal }}>
        {({ loading, error, data }) => {
          if (loading) {
            return <Loading />;
          }
          if (error) {
            return <FieldError mensaje={error} />;
          }
          return (
            <Mutation
              mutation={REMOVE_TIPO_ABONO}
              refetchQueries={[{ query: getTiposAbonos, variables: { idSucursal } }]}
            >
              {removeTipoAbono => (
                <TiposAbonos
                  idSucursal={idSucursal}
                  tiposAbonos={data.tiposAbonos}
                  nuevo={this.nuevo}
                  editar={this.editar}
                  eliminar={removeTipoAbono}
                />
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

TiposAbonosContainer.propTypes = {
  data: PropTypes.object,
};

const mapStateToProps = (state) => ({
  idSucursal: state.sucursal,
});

export default connect(mapStateToProps)(TiposAbonosContainer);
