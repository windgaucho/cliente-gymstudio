import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Query, Mutation } from 'react-apollo';

import Articulos from './Articulos';
import getArticulos from '../../../graphql/querys/getArticulos.graphql';
import REMOVE_ARTICULO from '../../../graphql/mutations/removeArticulo.graphql';
import Loading from '../../common/Loading';
import FieldError from '../../common/FieldError';

class ArticulosContainer extends Component {
  state = {
    errorArticulos: '',
  };

  nuevo = () => {
    this.props.history.push('/administracion/articulos/nuevo');
  }

  editar = (e) => {
    const { id } = e.target;
    this.props.history.push(`/administracion/articulos/editar/${id}`);
  }

  render() {
    const { idSucursal } = this.props;
    return (
      <Query query={getArticulos} variables={{ idSucursal }}>
        {({ loading, error, data }) => {
          if (loading) {
            return <Loading />;
          }
          if (error) {
            return <FieldError mensaje={error.message} />;
          }
          return (
            <Mutation
              mutation={REMOVE_ARTICULO}
              refetchQueries={[{ query: getArticulos, variables: { idSucursal } }]}
            >
              {removeArticulo => (
                <Articulos
                  idSucursal={idSucursal}
                  articulos={data.articulos}
                  nuevo={this.nuevo}
                  editar={this.editar}
                  eliminar={removeArticulo}
                />
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

ArticulosContainer.propTypes = {
  data: PropTypes.object,
};

const mapStateToProps = (state) => ({
  idSucursal: state.sucursal,
});

export default connect(mapStateToProps)(ArticulosContainer);
