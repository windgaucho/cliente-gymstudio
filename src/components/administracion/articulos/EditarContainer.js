import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';

import FormArticulo from './FormArticulo';
import getArticulo from '../../../graphql/querys/getArticulo.graphql';
import updateArticulo from '../../../graphql/mutations/updateArticulo.graphql';
import getRubros from '../../../graphql/querys/getRubros.graphql';
import Loading from '../../common/Loading';
import FieldError from '../../common/FieldError';
import Editar from './Editar';

class EditarContainer extends Component {
  state = {
    articulo: {},
    error: '',
  };

  onCompleted = (data) => {
    console.log('onCompleted', data);
  }

  onSubmit = () => {
    const { articulo } = this.state;
    this.props.updateArticulo({
      variables: { articulo },
    })
      .then(() => this.props.history.push('/administracion/articulos'))
      .catch(error => this.setState({ error: error.message }));
  }

  cancelar = () => {
    this.props.history.goBack();
  }

  render() {
    // const { articulo, error } = this.state;
    const { match, idSucursal } = this.props;

    return (
      <Query query={getRubros} variables={{ idSucursal }}>
        {(queryRubros) => {
          if (queryRubros.loading) {
            return <Loading />;
          }
          if (queryRubros.error) {
            return <FieldError mensaje={queryRubros.error.message} />;
          }
          return (
            <Query query={getArticulo} variables={{ id: match.params.id }} onCompleted={this.onCompleted}>
              {(queryArticulo) => {
                if (queryArticulo.loading) {
                  return <Loading />;
                }
                if (queryArticulo.error) {
                  return <FieldError mensaje={queryArticulo.error.message} />;
                }
                return (
                  <Editar
                    rubros={queryRubros.data.rubros}
                    articulo={queryArticulo.data.articulo}
                  />
                );
              }}
            </Query>
          );
        }}
      </Query>
    );
  }
}

EditarContainer.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  idSucursal: state.sucursal,
});

export default connect(mapStateToProps)(EditarContainer);
