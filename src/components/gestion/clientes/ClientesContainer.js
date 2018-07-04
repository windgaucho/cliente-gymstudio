import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withApollo, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal } from 'antd';

import buscarxApyn from '../../../graphql/querys/buscarxApyn.graphql';
import removeCliente from '../../../graphql/mutations/removeCliente.graphql';
import Clientes from './Clientes';
import * as actionsCliente from '../../../actions/cliente';

class ClientesContainer extends Component {
  state = {
    cliente: {
      apyn: '',
    },
    clientes: [],
    loading: false,
  };

  static getDerivedStateFromProps(props) {
    if (props.apyn) {
      return {
        cliente: {
          apyn: props.apyn,
        },
      };
    }
    return null;
  }

  componentDidMount() {
    if (this.state.cliente.apyn) {
      this.setState({ loading: true });
      this.props.client.query({
        query: buscarxApyn,
        variables: {
          idSucursal: this.props.usuario.idSucursal,
          apyn: this.state.cliente.apyn,
        },
      }).then(resultado => {
        this.setState({ clientes: resultado.data.buscarxApyn, loading: false });
      });
    }
  }

  onChange = (field) => {
    if (field.apyn.length < 3) {
      return this.setState({ cliente: { ...field } });
    }
    this.setState({ loading: true });
    this.props.client.query({
      query: buscarxApyn,
      variables: {
        idSucursal: this.props.usuario.idSucursal,
        apyn: field.apyn,
      },
      fetchPolicy: 'network-only',
    }).then(resultado => {
      this.setState({ cliente: { ...field }, clientes: resultado.data.buscarxApyn, loading: false });
    });
  }

  nuevo = () => {
    this.props.history.push('/gestion/clientes/nuevo');
  }

  editar = (e) => {
    const { id } = e.target;
    this.props.actions.setApynCliente(this.state.cliente.apyn);
    this.props.history.push(`/gestion/clientes/editar/${id}`);
  }

  abonos = (e) => {
    const { id } = e.target;
    this.props.history.push(`/clientes/Clientes/abonos/${id}`);
  }

  eliminar = (e) => {
    const confirm = Modal.confirm;
    const _self = this;
    const { id } = e.target;
    confirm({
      title: 'Seguro desea dar de baja al Cliente?',
      content: 'Rubros',
      okText: 'Si',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        _self.props.removeCliente({
          variables: { id },
        })
          .then(() => _self.setState({ cliente: { apyn: '' }, clientes: [] }))
          .catch(error => _self.setState({ error: error.message }));
      },
      onCancel() {
        _self.props.history.push('/clientes/Clientes');
      },
    });
  }

  render() {
    const { cliente, clientes, loading } = this.state;

    return (
      <Clientes
        loading={loading}
        onChange={this.onChange}
        cliente={cliente}
        clientes={clientes}
        nuevo={this.nuevo}
        editar={this.editar}
        eliminar={this.eliminar}
        abonos={this.abonos}
      />
    );
  }
}

ClientesContainer.propTypes = {
  client: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  apyn: state.cliente.apyn,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionsCliente, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(withApollo(ClientesContainer));
