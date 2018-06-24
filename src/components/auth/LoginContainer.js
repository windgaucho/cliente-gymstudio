import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import withRouter from 'react-router-dom/withRouter';
import { graphql } from 'react-apollo';

import loginUser from '../../graphql/mutations/login.graphql';
import LoginForm from './LoginForm';
import Loading from '../common/Loading';

class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: {
        username: '',
        password: '',
      },
      error: {
        mensaje: '',
        username: false,
        password: false,
      },
      loading: false,
    };
  }

  onChange = (field) => {
    this.setState({
      usuario: { ...this.state.usuario, ...field },
    });
  }

  submit = () => {
    this.setState({ loading: true });
    const { usuario } = this.state;
    const { username } = usuario;
    const { password } = usuario;
    const error = { ...this.state.error };
    const { history, login } = this.props;

    if (!isEmpty(username) && !isEmpty(password)) {
      login({
        userId: username,
        password,
      })
        .then(() => {
          history.push('/');
        })
        .catch((errorLogin) => {
          error.mensaje = errorLogin.message;
          this.setState({ error, loading: false });
        });
    } else {
      error.mensaje = 'Ingrese Usuario y Contraseña.';
      error.username = isEmpty(username);
      error.password = isEmpty(password);
      this.setState({ error, loading: false });
    }
  }

  render() {
    const { error, usuario, loading } = this.state;
    if (loading) return <Loading />;
    return (
      <LoginForm
        submitAction={this.submit}
        usuario={usuario}
        error={error}
        onChange={this.onChange}
      />
    );
  }
}

LoginContainer.propTypes = {
  history: PropTypes.object.isRequired,
};

export default graphql(
  loginUser, {
    props: ({ mutate }) => ({
      login: ({ userId, password }) =>
        mutate({
          variables: { userId, password },
        }),
    }),
  })(withRouter(LoginContainer));
