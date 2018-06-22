import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Row, Col, Button, Divider } from 'antd';

import FieldError from '../../common/FieldError';
// import NuevoContainer from './NuevoContainer';

class Sucursales extends Component {
  state = {
    columns: [
      {
        title: 'Nombre',
        dataIndex: 'nombre',
        key: 'nombre',
      }, {
        title: 'Ciudad',
        key: 'ciudad',
        render: (text, record) => (
          record.ciudad.nombre
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
              onClick={this.props.eliminar}
            />
          </span>
        ),
      },
    ],
  }

  render() {
    const { sucursales, error } = this.props;
    return (
      <div>
        <Row style={{ marginBottom: 10 }}>
          <Col span={21}>
            <h3>Administración de Sucursales</h3>
          </Col>
          <Col span={3} style={{ textAlign: 'right' }} />
        </Row>
        { error ?
          <FieldError mensaje={error} />
          : null
        }
        <Table
          rowKey="id"
          dataSource={sucursales}
          columns={this.state.columns}
          pagination={false}
          locale={{
            emptyText: 'Sin datos para mostrar',
          }}
        />
      </div>
    );
  }
}

Sucursales.propTypes = {
  sucursales: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default Sucursales;
