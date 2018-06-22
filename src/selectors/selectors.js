import React from 'react';
import { Select } from 'antd';

export const mapOptionSelect = (items) => {
  const { Option } = Select;
  return items.map((item) => (
    <Option key={item.id} value={item.id}>{item.nombre}</Option>
  ));
};

export const mapOptionSelectApyn = (items) => {
  const { Option } = Select;
  return items.map((item) => (
    <Option key={item.id} value={item.id}>{`${item.apellido} ${item.nombre}`}</Option>
  ));
};
