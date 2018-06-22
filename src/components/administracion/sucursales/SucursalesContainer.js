import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import { graphql, compose } from 'react-apollo';

import Sucursales from './Sucursales';
import getSucursales from '../../../graphql/querys/getSucursales.graphql';
import Loading from '../../common/Loading';

class SucursalesContainer extends Component {
  state = {
    error: '',
  };

  nuevo = () => {
    this.props.history.push('/administracion/sucursales/nuevo');
  }

  editar = (e) => {
    const { id } = e.target;
    this.props.history.push(`/administracion/sucursales/editar/${id}`);
  }

  eliminar = (e) => {
    const confirm = Modal.confirm;
    const _self = this;
    const { id } = e.target;
    confirm({
      title: 'Seguro desea eliminar la Sucursal?',
      content: 'Sucursales',
      okText: 'Si',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        _self.props.removeRubro({
          variables: { id },
        })
          .then(() => _self.props.history.push('/administracion/Sucursales'))
          .catch(error => _self.setState({ error: error.message }));
      },
      onCancel() {
        _self.props.history.push('/administracion/Sucursales');
      },
    });
  }

  render() {
    const { data } = this.props;
    if (data.loading) {
      return <Loading />;
    }
    return (
      <Sucursales
        sucursales={data.sucursales}
        nuevo={this.nuevo}
        editar={this.editar}
        eliminar={this.eliminar}
      />
    );
  }
}

SucursalesContainer.propTypes = {
  data: PropTypes.object,
};

export default compose(
  graphql(getSucursales),
  /* graphql(removeRubro, { name: 'removeRubro',
    options: {
      refetchQueries: [
        'getSucursales',
      ],
    },
  })*/
)(SucursalesContainer);
