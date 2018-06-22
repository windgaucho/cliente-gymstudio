import React from 'react';
import PropTypes from 'prop-types';
import { Tag } from 'antd';

const FieldError = ({ mensaje }) => (
  <Tag color="red">
    {mensaje}
  </Tag>
);

FieldError.propTypes = {
  mensaje: PropTypes.string.isRequired,
};

export default FieldError;
