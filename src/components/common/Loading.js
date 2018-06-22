import React from 'react';
import PropTypes from 'prop-types';
import { Spin, Row } from 'antd';

class Loading extends React.Component {
  render() {
    let { mensaje } = this.props;
    if (!mensaje) {
      mensaje = 'Cargando....';
    }
    return (
      <Row type="flex" justify="center" style={{ marginTop: '30vh' }}>
        <Spin
          size="large"
          tip={mensaje}
        />
      </Row>
    );
  }
}

Loading.propTypes = {
  mensaje: PropTypes.string,
};

export default Loading;
