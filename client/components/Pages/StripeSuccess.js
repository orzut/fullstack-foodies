import React, { Component } from 'react';
import { connect } from 'react-redux';
import { processOrder } from '../../store';

class StripeSuccess extends Component {
  componentDidMount(){
    this.props.processOrder();
  }
  render() {
    return (
      <div>
        <div>
                <div>
                    <div>
                        <h1>Order Confirmation</h1>
                    </div>
                </div>  
          </div>
          <div>
            <h2><span>Thank you for your order!</span></h2>
        </div>
      </div>
    )
  }
}

const mapDispatch = (dispatch) => {
  return {
      processOrder: () => dispatch(processOrder())
  };
}

export default connect((state) => state, mapDispatch)(StripeSuccess);