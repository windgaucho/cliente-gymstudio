import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Form, Input, Select, Button, Card } from 'antd';

import { mapOptionSelect } from '../../../selectors/selectors';

const FormItem = Form.Item;

class FormSucursal extends Component {
  onSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit();
      }
    });
  }

  render() {
    const { ciudades } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 2, offset: 1 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 21 },
      },
    };

    const formTailLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 8, offset: 3 },
    };

    return (
      <Row>
        <Col span={20} offset={2}>
          <Card title="Sucursales" bordered={false}>
            <Form>
              <FormItem
                {...formItemLayout}
                label="Ciudad"
              >
                {getFieldDecorator('idCiudad', {
                  rules: [{ required: true, message: 'Por favor, seleccione la ciudad' }],
                })(
                  <Select>
                    {mapOptionSelect(ciudades)}
                  </Select>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="Nombre"
              >
                {getFieldDecorator('nombre', {
                  rules: [{ required: true, message: 'Por favor, ingrese el nombre de la sucursal' }],
                })(
                  <Input />
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
                  onClick={this.props.onCancel}
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

FormSucursal.propTypes = {
  sucursal: PropTypes.object.isRequired,
};

export default Form.create({
  onValuesChange(props, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    return {
      idCiudad: Form.createFormField({
        value: props.sucursal.idCiudad,
      }),
      nombre: Form.createFormField({
        value: props.sucursal.nombre,
      }),
    };
  },
})(FormSucursal);
