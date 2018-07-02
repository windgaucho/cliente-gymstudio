import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import { isEmpty } from 'lodash';

import FormRubro from './FormRubro';
import getRubro from '../../../graphql/querys/getRubro.graphql';
import updateRubro from '../../../graphql/mutations/updateRubro.graphql';

class EditarContainer extends Component {
  state = {
    rubro: {},
    error: '',
  };

  static getDerivedStateFromProps(props, state) {
    if (!props.data.loading && isEmpty(state.rubro)) {
      return {
        rubro: {
          id: props.data.rubro.id,
          nombre: props.data.rubro.nombre,
          idSucursal: props.data.rubro.idSucursal,
        },
      };
    }
    return null;
  }

  onSubmit = () => {
    const { rubro } = this.state;
    return this.props.update(rubro);
  }

  onChange = (field) => {
    this.setState({
      rubro: { ...this.state.rubro, ...field },
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
    const { rubro, error } = this.state;

    return (
      <FormRubro
        onSubmit={this.onSubmit}
        onChange={this.onChange}
        rubro={rubro}
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
  graphql(getRubro, {
    options: (props) => ({
      variables: { id: props.match.params.id },
    }),
  }),
  graphql(updateRubro, {
    props: ({ mutate }) => ({
      update: (rubro) =>
        mutate({
          variables: { rubro },
        }),
    }),
  }),
)(EditarContainer);
