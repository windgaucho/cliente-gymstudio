import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Query, Mutation } from 'react-apollo';

import Rubros from './Rubros';
import getRubros from '../../../graphql/querys/getRubros.graphql';
import REMOVE_RUBRO from '../../../graphql/mutations/removeRubro.graphql';
import Loading from '../../common/Loading';
import FieldError from '../../common/FieldError';

class RubrosContainer extends Component {
  state = {
    error: '',
  };

  nuevo = () => {
    this.props.history.push('/administracion/rubros/nuevo');
  }

  editar = (e) => {
    const { id } = e.target;
    this.props.history.push(`/administracion/rubros/editar/${id}`);
  }

  render() {
    const { idSucursal } = this.props;

    return (
      <Query query={getRubros} variables={{ idSucursal }}>
        {({ loading, error, data }) => {
          if (loading) {
            return <Loading />;
          }
          if (error) {
            return <FieldError mensaje={error} />;
          }
          return (
            <Mutation
              mutation={REMOVE_RUBRO}
              refetchQueries={[{ query: getRubros, variables: { idSucursal } }]}
            >
              {removeRubro => (
                <Rubros
                  idSucursal={idSucursal}
                  rubros={data.rubros}
                  nuevo={this.nuevo}
                  editar={this.editar}
                  eliminar={removeRubro}
                />
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

RubrosContainer.propTypes = {
  data: PropTypes.object,
};

const mapStateToProps = (state) => ({
  idSucursal: state.sucursal,
});

export default connect(mapStateToProps)(RubrosContainer);
