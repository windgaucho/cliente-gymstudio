import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, DatePicker, Button, Card, Row, Col, Select } from 'antd';
import { withRouter } from 'react-router-dom';

import { mapOptionSelect } from '../../../selectors/selectors';

class FormCliente extends Component {
  onCancel = () => {
    this.props.history.push('/gestion/clientes');
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit()
          .then(() => {
            this.props.history.push('/gestion/clientes');
          });
      }
    });
  }

  render() {
    const FormItem = Form.Item;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };

    const formTailLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 20, offset: 4 },
    };
    const { tiposAbonos } = this.props;
    return (
      <Row>
        <Col span={20} offset={2}>
          <Card title="Datos del Cliente" bordered={false}>
            <Form>
              <FormItem
                {...formItemLayout}
                label="Apellido"
              >
                {getFieldDecorator('apellido', {
                  rules: [{ required: true, message: 'Por favor, ingrese el apellido del cliente' }],
                })(<Input />)}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="Nombre"
              >
                {getFieldDecorator('nombre', {
                  rules: [{ required: true, message: 'Por favor, ingrese el nombre del cliente' }],
                })(<Input />)}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="Doc.Id."
              >
                {getFieldDecorator('docId', {
                  rules: [{ required: true, message: 'Por favor, ingrese el Documento' }],
                })(<Input />)}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="Tipo de Abono"
              >
                {getFieldDecorator('idTipoAbono', {
                  rules: [{ required: true, message: 'Por favor, seleccione el tipo de abono' }],
                })(
                  <Select>
                    {mapOptionSelect(tiposAbonos)}
                  </Select>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="Fecha Ingreso"
              >
                {getFieldDecorator('fechaIngreso', {
                  rules: [{ required: true, message: 'Por favor, ingrese la fecha de ingreso' }],
                })(<DatePicker format="DD/MM/YYYY" />)}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="Domicilio"
              >
                {getFieldDecorator('domicilio')(<Input />)}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="Teléfono"
              >
                {getFieldDecorator('telefono')(<Input />)}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="Contacto"
              >
                {getFieldDecorator('contacto')(<Input />)}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="Email"
              >
                {getFieldDecorator('email', {
                  rules: [{
                    type: 'email', message: 'el mail no es válido',
                  }],
                })(<Input />)}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="Sexo"
              >
                {getFieldDecorator('sexo', {
                  rules: [{ required: true, message: 'Por favor, seleccione el sexo' }],
                })(
                  <Select>
                    <Select.Option value="F">Femenino</Select.Option>
                    <Select.Option value="M">Masculino</Select.Option>
                  </Select>
                )}
              </FormItem>
              <FormItem
                {...formTailLayout}
              >
                <Button
                  type="primary"
                  onClick={this.onSubmit}
                >
                  Guardar
                </Button>
                <Button
                  style={{ marginLeft: 8 }}
                  onClick={this.onCancel}
                >
                  Cancelar
                </Button>
              </FormItem>
            </Form>
          </Card>
        </Col>
      </Row>
    );
  }
}

FormCliente.propTypes = {
  cliente: PropTypes.object.isRequired,
};
export default Form.create({
  onValuesChange(props, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    return {
      apellido: Form.createFormField({
        value: props.cliente.apellido,
      }),
      nombre: Form.createFormField({
        value: props.cliente.nombre,
      }),
      docId: Form.createFormField({
        value: props.cliente.docId,
      }),
      domicilio: Form.createFormField({
        value: props.cliente.domicilio,
      }),
      telefono: Form.createFormField({
        value: props.cliente.telefono,
      }),
      contacto: Form.createFormField({
        value: props.cliente.contacto,
      }),
      email: Form.createFormField({
        value: props.cliente.email,
      }),
      sexo: Form.createFormField({
        value: props.cliente.sexo,
      }),
      idTipoAbono: Form.createFormField({
        value: props.cliente.idTipoAbono,
      }),
      fechaIngreso: Form.createFormField({
        value: props.cliente.fechaIngreso,
      }),
    };
  },
})(withRouter(FormCliente));
