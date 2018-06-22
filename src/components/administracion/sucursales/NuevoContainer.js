import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import { Button } from 'antd';

import FormSucursal from './FormSucursal';
import createSucursal from '../../../graphql/mutations/createSucursal.graphql';
import queryCiudades from '../../../graphql/querys/getCiudades.graphql';
import Loading from '../../common/Loading';

class NuevoContainer extends Component {
  state = {
    sucursal: {
      nombre: '',
      idCiudad: '',
    },
    error: {},
    formVisible: false,
  };

  onSubmit = () => {
    const { sucursal } = this.state;
    this.props.crearSucursal({
      variables: { sucursal },
    })
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

  handleModal = () => {
    this.setState({ formVisible: !this.state.formVisible });
  }

  render() {
    const { getCiudades } = this.props;
    if (getCiudades.loading) {
      return <Loading />;
    }
    const { formVisible } = this.state;
    return (
      <div>
        <Button
          type="primary"
          icon="plus"
          onClick={this.handleModal}
        >Nueva Sucursal</Button>
        <FormSucursal
          visible={formVisible}
          handleModal={this.handleModal}
          ciudades={getCiudades.ciudades}
          sucursal={this.state.sucursal}
          onSubmit={this.onSubmit}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

NuevoContainer.propTypes = {
  crearSucursal: PropTypes.func,
};

export default compose(
  graphql(createSucursal,
    { name: 'crearSucursal',
      options: {
        refetchQueries: [
          'sucursales',
        ],
      },
    }),
  graphql(queryCiudades,
    { name: 'getCiudades',
    })
)(NuevoContainer);
