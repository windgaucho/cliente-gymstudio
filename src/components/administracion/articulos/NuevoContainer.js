import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Mutation, Query } from 'react-apollo';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import getRubros from '../../../graphql/querys/getRubros.graphql';
import getArticulos from '../../../graphql/querys/getArticulos.graphql';
import CREATE_ARTICULO from '../../../graphql/mutations/createArticulo.graphql';
import FormArticulo from './FormArticulo';
import Loading from '../../common/Loading';
import FieldError from '../../common/FieldError';

class NuevoContainer extends Component {
  state = {
    articulo: {},
    error: {},
  };

  static getDerivedStateFromProps(props, state) {
    if (isEmpty(state.articulo)) {
      return {
        articulo: {
          idSucursal: props.idSucursal,
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
    const { idSucursal } = this.props;
    const { articulo } = this.state;
    return (
      <Query query={getRubros} variables={{ idSucursal }}>
        {({ loading, error, data }) => {
          if (loading) {
            return <Loading />;
          }
          if (error) {
            return <FieldError mensaje={error.message} />;
          }
          return (
            <Mutation
              mutation={CREATE_ARTICULO}
              variables={{ articulo }}
              refetchQueries={[{ query: getArticulos, variables: { idSucursal } }]}
            >
              {createArticulo => (
                <FormArticulo
                  articulo={this.state.articulo}
                  onSubmit={createArticulo}
                  onChange={this.onChange}
                  rubros={data.rubros}
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
  idSucursal: PropTypes.number,
};

const mapStateToProps = (state) => ({
  idSucursal: state.sucursal,
});

export default connect(mapStateToProps)(NuevoContainer);
