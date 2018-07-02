import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import { isEmpty } from 'lodash';

import FormSucursal from './FormSucursal';
import updateSucursal from '../../../graphql/mutations/updateSucursal.graphql';
import queryCiudades from '../../../graphql/querys/getCiudades.graphql';
import querySucursal from '../../../graphql/querys/getSucursal.graphql';
import Loading from '../../common/Loading';

class EditarContainer extends Component {
  state = {
    sucursal: {},
    error: {},
  };

  static getDerivedStateFromProps(nextProps, state) {
    if (!nextProps.getSucursal.loading && isEmpty(state.sucursal)) {
      return {
        sucursal: {
          id: nextProps.getSucursal.sucursal.id,
          idCiudad: nextProps.getSucursal.sucursal.idCiudad,
          nombre: nextProps.getSucursal.sucursal.nombre,
        },
      };
    }
    return null;
  }

  onSubmit = () => {
    const { sucursal } = this.state;
    console.log('sucursal', sucursal);

    this.props.update({ sucursal })
      .then(() => {
        this.props.history.push('/administracion/sucursales');
      })
      .catch(error => this.setState({ error: error.message }));
  }

  onChange = (field) => {
    this.setState({
      sucursal: { ...this.state.sucursal, ...field },
    });
  }

  onCancel = () => {
    this.props.history.push('/administracion/sucursales');
  }

  render() {
    const { getCiudades } = this.props;
    if (getCiudades.loading) {
      return <Loading />;
    }
    return (
      <FormSucursal
        ciudades={getCiudades.ciudades}
        sucursal={this.state.sucursal}
        onCancel={this.onCancel}
        onSubmit={this.onSubmit}
        onChange={this.onChange}
      />
    );
  }
}

EditarContainer.propTypes = {
  updateSucursal: PropTypes.func,
};

export default compose(
  graphql(updateSucursal, {
    props: ({ mutate }) => ({
      update: ({ sucursal }) =>
        mutate({
          variables: { sucursal },
          refetchQueries: [{
            query: querySucursal,
            variables: { id: sucursal.id },
          }],
        }),
    }),
  }),
  graphql(querySucursal, {
    options: (props) => ({
      variables: { id: props.match.params.id },
    }),
    name: 'getSucursal',
  }),
  graphql(queryCiudades, {
    name: 'getCiudades',
  })
)(EditarContainer);
