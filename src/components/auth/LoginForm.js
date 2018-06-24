import React from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Input, Button, Row } from 'antd';

import FieldError from '../common/FieldError';

class LoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.submitAction(values);
      }
    });
  }

  render() {
    const FormItem = Form.Item;
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={{ marginTop: '20vh' }}>
        <Row type="flex" align="middle" justify="center" >
          <img src='' className="" />
        </Row>
        <Row type="flex" align="middle" justify="center" style={{ marginTop: 10 }}>
          <Form onSubmit={this.handleSubmit} style={{ width: 300 }}>
            <FormItem>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Por favor, ingrese su usuario!' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Usuario" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Por favor ingrese su clave!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Clave" />
              )}
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                Ingresar
              </Button>
            </FormItem>
            {this.props.error.mensaje ?
              <FormItem>
                <FieldError mensaje={this.props.error.mensaje} />
              </FormItem>
              : null }
          </Form>
        </Row>
      </div>
    );
  }
}

LoginForm.propTypes = {
  usuario: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  submitAction: PropTypes.func.isRequired,
  error: PropTypes.object,
  form: PropTypes.object.isRequired,
};

export default Form.create({
  onValuesChange(props, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    return {
      username: Form.createFormField({
        value: props.usuario.username,
      }),
      password: Form.createFormField({
        value: props.usuario.password,
      }),
    };
  },
})(LoginForm);
