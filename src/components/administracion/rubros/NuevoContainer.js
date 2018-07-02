import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import FormRubro from './FormRubro';
import CREATE_RUBRO from '../../../graphql/mutations/createRubro.graphql';
import getRubros from '../../../graphql/querys/getRubros.graphql';

class NuevoContainer extends Component {
  state = {
    rubro: {},
    error: {},
  };

  static getDerivedStateFromProps(props, state) {
    if (isEmpty(state.rubro)) {
      return {
        rubro: {
          idSucursal: props.idSucursal,
        },
      };
    }
    return null;
  }

  onChange = (field) => {
    this.setState({
      rubro: { ...this.state.rubro, ...field },
    });
  }

  render() {
    const { rubro } = this.state;

    return (
      <Mutation
        mutation={CREATE_RUBRO}
        variables={{ rubro }}
        refetchQueries={[{ query: getRubros, variables: { idSucursal: this.props.idSucursal } }]}
      >
        {createRubro => (
          <FormRubro
            rubro={rubro}
            onSubmit={createRubro}
            onChange={this.onChange}
          />
        )}
      </Mutation>
    );
  }
}

NuevoContainer.propTypes = {
  idSucursal: PropTypes.number,
};

const mapStateToProps = (state) => ({
  idSucursal: state.sucursal,
});

export default connect(mapStateToProps)(NuevoContainer);
