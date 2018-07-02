import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import FormTipoAbono from './FormTipoAbono';
import CREATE_TIPO_ABONO from '../../../graphql/mutations/createTipoAbono.graphql';
import getTiposAbonos from '../../../graphql/querys/getTiposAbonos.graphql';

class NuevoContainer extends Component {
  state = {
    tipoAbono: {},
    error: {},
  };

  static getDerivedStateFromProps(props, state) {
    if (isEmpty(state.tipoAbono)) {
      return {
        tipoAbono: {
          idSucursal: props.idSucursal,
        },
      };
    }
    return null;
  }

  onChange = (field) => {
    this.setState({
      tipoAbono: { ...this.state.tipoAbono, ...field },
    });
  }

  render() {
    const { tipoAbono } = this.state;

    return (
      <Mutation
        mutation={CREATE_TIPO_ABONO}
        variables={{ tipoAbono }}
        refetchQueries={[{ query: getTiposAbonos, variables: { idSucursal: this.props.idSucursal } }]}
      >
        {createtipoAbono => (
          <FormTipoAbono
            tipoAbono={tipoAbono}
            onSubmit={createtipoAbono}
            onChange={this.onChange}
          />
        )}
      </Mutation>
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
