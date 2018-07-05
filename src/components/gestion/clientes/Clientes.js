import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Table, Row, Col, Button, Card, Divider, Form, Input, Popover } from 'antd';

import FieldError from '../../common/FieldError';
import Loading from '../../common/Loading';

class Clientes extends Component {
  state = {
    columns: [
      {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Apellido y Nombre',
        key: 'apyn',
        render: (text, record) => (
          `${record.apellido} ${record.nombre}`
        ),
      },
      {
        title: 'Ingreso',
        dataIndex: 'ingreso',
        render: (text, record) => (
          moment(record.fechaIngreso).format('DD/MM/YYYY')
        ),
      },
      {
        title: 'Vencimiento',
        dataIndex: 'vencimiento',
        render: (text, record) => {
          const fechaVencimiento = record.fechaVencimiento ? moment(record.fechaVencimiento).format('DD/MM/YYYY') : '';
          const fecha = new Date();
          const color = moment(fecha).isAfter(record.fechaVencimiento) ? '#f5222d' : '#1890ff';
          return (
            <span style={{ color }}>{fechaVencimiento}</span>
          );
        },
      },
      {
        title: '',
        key: 'acciones',
        render: (text, record) => (
          <span>
            <Button
              type="primary"
              icon="edit"
              shape="circle"
              id={record.id}
              onClick={this.props.editar}
            />
            <Divider type="vertical" />
            <Button
              type="danger"
              icon="delete"
              shape="circle"
              id={record.id}
              onClick={this.props.eliminar}
            />
            <Divider type="vertical" />
            <Popover
              content={(
                <div>
                  Ver movimientos del cliente
                </div>
              )}
              title="Abonos"
            >
              <Button
                icon="calendar"
                shape="circle"
                id={record.id}
                onClick={this.props.abonos}
              />
            </Popover>
          </span>
        ),
      },
    ],
  }

  render() {
    const { clientes, error, loading } = this.props;
    const FormItem = Form.Item;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 1 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 10 },
      },
    };
    return (
      <Row>
        <Card title="Búsqueda de Clientes" bordered={false}>
          <Row>
            <Col span={21}>
              <Form>
                <FormItem
                  {...formItemLayout}
                >
                  {getFieldDecorator('apyn')(<Input placeholder="ingrese el nombre del cliente a buscar" />)}
                </FormItem>
              </Form>
            </Col>
            <Col span={3} style={{ textAlign: 'right' }}>
              <Button
                type="primary"
                icon="user-add"
                onClick={this.props.nuevo}
              >Nuevo Cliente</Button>
            </Col>
          </Row>
          { error ?
            <FieldError mensaje={error} />
            : null
          }
          {loading ?
            <Loading mensaje="buscando usuarios...." />
            :
            <Table
              rowKey="id"
              dataSource={clientes}
              columns={this.state.columns}
              pagination={false}
              locale={{
                emptyText: 'Sin datos para mostrar',
              }}
            />
          }
        </Card>
      </Row>
    );
  }
}

Clientes.propTypes = {
  clientes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Form.create({
  onValuesChange(props, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    return {
      apyn: Form.createFormField({
        value: props.apyn,
      }),
    };
  },
})(Clientes);
