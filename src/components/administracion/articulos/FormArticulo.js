import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Select, Button, Card, Row, Col, InputNumber } from 'antd';
import { withRouter } from 'react-router-dom';

import { mapOptionSelect } from '../../../selectors/selectors';
import FieldError from '../../common/FieldError';

class FormArticulo extends Component {
  onCancel = () => {
    this.props.history.push('/administracion/articulos');
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit()
          .then(() => {
            this.props.history.push('/administracion/articulos');
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
    const { error, rubros } = this.props;
    return (
      <Row>
        <Col span={20} offset={2}>
          <Card title="Articulo" bordered={false}>
            <Form>
              <FormItem
                {...formItemLayout}
                label="Nombre"
              >
                {getFieldDecorator('nombre', {
                  rules: [{ required: true, message: 'Por favor, ingrese el nombre del articulo' }],
                })(<Input />)}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="Rubro"
              >
                {getFieldDecorator('idRubro', {
                  rules: [{ required: true, message: 'Por favor, seleccione el precio de articulo' }],
                })(
                  <Select>
                    {mapOptionSelect(rubros)}
                  </Select>
                )}
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

FormArticulo.propTypes = {
  articulo: PropTypes.object.isRequired,
  rubros: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default Form.create({
  onValuesChange(props, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    return {
      nombre: Form.createFormField({
        value: props.articulo.nombre,
      }),
      precio: Form.createFormField({
        value: props.articulo.precio,
      }),
      idRubro: Form.createFormField({
        value: props.articulo.idRubro,
      }),
    };
  },
})(withRouter(FormArticulo));
