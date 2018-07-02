import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Query } from 'react-apollo';
import { Select } from 'antd';

import * as actions from '../../../actions/sucursal';
import { mapOptionSelect } from '../../../selectors/selectors';
import getSucursales from '../../../graphql/querys/getSucursales.graphql';
import Loading from '../../common/Loading';
import FieldError from '../../common/FieldError';

class Sucursal extends Component {
  onChangeSucursal = (value) => {
    this.props.actions.setSucursal(value);
  }

  render() {
    const { idSucursal } = this.props;
    return (
      <Query query={getSucursales}>
        {({ loading, error, data }) => {
          if (loading) {
            return <Loading />;
          }
          if (error) {
            return <FieldError mensaje={error} />;
          }
          return (
            <Select
              style={{ width: 200 }}
              placeholder="Seleccione una sucursal"
              onChange={this.onChangeSucursal}
              value={idSucursal}
            >
              {mapOptionSelect(data.sucursales)}
            </Select>
          );
        }}
      </Query>
    );
  }
}

Sucursal.propTypes = {
  actions: PropTypes.object.isRequired,
  idSucursal: PropTypes.number,
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

const mapStateToProps = (state) => ({
  idSucursal: state.sucursal === 0 ? undefined : state.sucursal,
});

export default connect(mapStateToProps, mapDispatchToProps)(Sucursal);
