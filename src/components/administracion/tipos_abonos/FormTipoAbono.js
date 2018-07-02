import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Card, Row, Col, InputNumber } from 'antd';
import { withRouter } from 'react-router-dom';

import FieldError from '../../common/FieldError';

class FormCardTipoAbono extends Component {
  onCancel = () => {
    this.props.history.push('/administracion/tipos_abonos');
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit()
          .then(() => {
            this.props.history.push('/administracion/tipos_abonos');
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
    const { error } = this.props;
    return (
      <Row>
        <Col span={20} offset={2}>
          <Card title="Tipos de Abonos" bordered={false}>
            <Form>
              <FormItem
                {...formItemLayout}
                label="Nombre"
              >
                {getFieldDecorator('nombre', {
                  rules: [{ required: true, message: 'Por favor, ingrese el nombre del tipo del tipoAbono' }],
                })(<Input />)}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="Precio"
              >
                {getFieldDecorator('precio')(
                  <InputNumber />
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
              { error ?
                <FormItem
                  {...formTailLayout}
                >
                  <FieldError mensaje={error} />
                </FormItem>
                : null
              }
            </Form>
          </Card>
        </Col>
      </Row>
    );
  }
}

FormCardTipoAbono.propTypes = {
  tipoAbono: PropTypes.object.isRequired,
};
export default Form.create({
  onValuesChange(props, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    return {
      nombre: Form.createFormField({
        value: props.tipoAbono.nombre,
      }),
      precio: Form.createFormField({
        value: props.tipoAbono.precio,
      }),
    };
  },
})(withRouter(FormCardTipoAbono));
