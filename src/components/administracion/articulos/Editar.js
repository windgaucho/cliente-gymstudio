import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Mutation } from 'react-apollo';

import FormArticulo from './FormArticulo';
import UPDATE_ARTICULO from '../../../graphql/mutations/updateArticulo.graphql';
import getArticulo from '../../../graphql/querys/getArticulo.graphql';

class Editar extends Component {
  state = {
    articulo: {},
  };

  static getDerivedStateFromProps(props, state) {
    if (isEmpty(state.articulo)) {
      return {
        articulo: {
          id: props.articulo.id,
          idRubro: props.articulo.idRubro,
          precio: props.articulo.precio,
          idSucursal: props.articulo.idSucursal,
          nombre: props.articulo.nombre,
        },
      };
    }
    return null;
  }

  onChange = (field) => {
    this.setState({
      articulo: { ...this.state.articulo, ...field },
    });
  }

  render() {
    const { rubros } = this.props;
    const { articulo } = this.state;
    return (
      <Mutation
        mutation={UPDATE_ARTICULO}
        variables={{ articulo }}
        refetchQueries={[{ query: getArticulo, variables: { id: articulo.id } }]}
      >
        {updateArticulo => (
          <FormArticulo
            rubros={rubros}
            articulo={articulo}
            onSubmit={updateArticulo}
            onChange={this.onChange}
          />
        )}
      </Mutation>
    );
  }
}

Editar.propTypes = {
  articulo: PropTypes.object.isRequired,
};

export default Editar;
