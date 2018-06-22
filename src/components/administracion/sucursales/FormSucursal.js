import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Input, Select, Button } from 'antd';

import { mapOptionSelect } from '../../../selectors/selectors';

const FormItem = Form.Item;

class FormSucursal extends Component {
  render() {
    const { visible, handleModal, ciudades } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 3, offset: 1 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    return (
      <Modal
        title="Venta"
        visible={visible}
        onCancel={handleModal}
        width="50%"
        footer={[
          <Button key="back" onClick={this.props.handleModal}>Cancelar</Button>,
          <Button key="guardar" type="primary" onClick={this.props.onSubmit}>Guardar</Button>,
        ]}
      >
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
        </Form>
      </Modal>
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
