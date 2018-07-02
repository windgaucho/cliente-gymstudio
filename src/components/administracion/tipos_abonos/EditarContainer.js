import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import { isEmpty } from 'lodash';

import FormTipoAbono from './FormTipoAbono';
import getTipoAbono from '../../../graphql/querys/getTipoAbono.graphql';
import updateTipoAbono from '../../../graphql/mutations/updateTipoAbono.graphql';

class EditarContainer extends Component {
  state = {
    tipoAbono: {},
    error: '',
  };

  static getDerivedStateFromProps(props, state) {
    if (!props.data.loading && isEmpty(state.tipoAbono)) {
      return {
        tipoAbono: {
          id: props.data.tipoAbono.id,
          nombre: props.data.tipoAbono.nombre,
          precio: props.data.tipoAbono.precio,
          idSucursal: props.data.tipoAbono.idSucursal,
        },
      };
    }
    return null;
  }

  onSubmit = () => {
    const { tipoAbono } = this.state;
    return this.props.update(tipoAbono);
  }

  onChange = (field) => {
    this.setState({
      tipoAbono: { ...this.state.tipoAbono, ...field },
    });
  }

  cancelar = () => {
    this.props.history.goBack();
  }

  render() {
    const { data } = this.props;

    if (data.loading) {
      return <div>Loading....</div>;
    }
    const { tipoAbono, error } = this.state;

    return (
      <FormTipoAbono
        onSubmit={this.onSubmit}
        onChange={this.onChange}
        tipoAbono={tipoAbono}
        error={error}
      />
    );
  }
}

EditarContainer.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default compose(
  graphql(getTipoAbono, {
    options: (props) => ({
      variables: { id: props.match.params.id },
    }),
  }),
  graphql(updateTipoAbono, {
    props: ({ mutate }) => ({
      update: (tipoAbono) =>
        mutate({
          variables: { tipoAbono },
        }),
    }),
  }),
)(EditarContainer);
