import React from 'react';
import { connect } from 'react-redux';

const Cart = ({ cart })=> {

  return (
    <h1>Welcome to your cart</h1>
  );
};

export default connect(state => state)(Cart);