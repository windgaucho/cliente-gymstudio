import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Row, Col, Button, Card, Divider, Modal } from 'antd';
import { withRouter } from 'react-router-dom';

import FieldError from '../../common/FieldError';
import Sucursal from '../../common/sucursal/Sucursal';

class Articulos extends Component {
  state = {
    columns: [
      {
        title: 'Articulo',
        dataIndex: 'nombre',
        key: 'nombre',
      }, {
        title: 'Precio',
        dataIndex: 'precio',
        key: 'precio',
      }, {
        title: 'Rubro',
        key: 'rubro',
        render: (text, record) => (
          record.rubro.nombre
        ),
      },
      {
        title: '',
        key: 'acciones',
        render: (text, record) => (
          <span>
            <Button
              type="primary"
              shape="circle"
              icon="edit"
              id={record.id}
              onClick={this.props.editar}
            />
            <Divider type="vertical" />
            <Button
              type="danger"
              shape="circle"
              icon="delete"
              id={record.id}
              onClick={this.eliminar}
            />
          </span>
        ),
      },
    ],
  }

  eliminar = (e) => {
    const confirm = Modal.confirm;
    const _self = this;
    const { id } = e.target;
    confirm({
      title: 'Seguro desea eliminar el Articulo?',
      content: 'Articulos',
      okText: 'Si',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        _self.props.eliminar({
          variables: { id },
        })
          .then(() => _self.props.history.push('/administracion/articulos'))
          .catch(error => _self.setState({ error: error.message }));
      },
      onCancel() {
        _self.props.history.push('/administracion/articulos');
      },
    });
  }

  render() {
    const { articulos, error, idSucursal } = this.props;
    return (
      <Card bordered={false}>
        <Row style={{ marginBottom: 10 }}>
          <Col span={21}>
            <h3>Administración de Articulos</h3>
          </Col>
        </Row>
        <Row>
          <Col span={21}>
            <Sucursal />
          </Col>
          <Col span={3} style={{ textAlign: 'right' }}>
            {idSucursal ?
              <Button
                type="primary"
                icon="plus"
                onClick={this.props.nuevo}
              >Nuevo Articulo</Button>
              : null
            }
          </Col>
        </Row>
        { error ?
          <FieldError mensaje={error} />
          : null
        }
        <Row style={{ marginTop: 10 }}>
          <Table
            rowKey="id"
            dataSource={articulos}
            columns={this.state.columns}
            pagination={false}
            locale={{
              emptyText: 'Sin datos para mostrar',
            }}
          />
        </Row>
      </Card>
    );
  }
}

Articulos.propTypes = {
  articulos: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default withRouter(Articulos);
