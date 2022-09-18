import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteAddress, fetchAddresses } from "../../store";

class AddressBook extends React.Component{
    constructor() {
        super();
        this.state= {
        };
        this.deleteAddress = this.deleteAddress.bind(this);
    }
    componentDidMount(){
        this.props.fetchAddresses();
    }
    componentDidUpdate(){
    }
    deleteAddress(address) {
      this.props.deleteAddress(address);
    }
    render() {
      const { addresses, auth } = this.props;
      const userAddresses = addresses.filter(address => address.userId === auth.id)
      const { deleteAddress } = this;
      return (
        <div>
            <div>
                  <div>
                      <h1>Address Book</h1>
                      <div>
                          <p>-</p>
                          <p>Saved Addresses</p>
                      </div>
                  </div>
              </div>
            <div>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                  {
                    userAddresses.map( address => {
                        return (
                            <li key={ address.id }>
                              <p>
                                { address.firstName } { address.lastName }<br />
                                { address.address }<br />
                                { address.city }, { address.state } { address.zipCode }<br />
                                { address.country }
                              </p>
                              <Link to={`/account/addressbook/${address.id}`} style={{ textDecoration: 'none'}} id='editLink'>Edit</Link>
                              <button onClick={ () => deleteAddress(address) } id='deleteButton' style={{ border: 'none' }}>Delete</button>
                            </li>
                        )
                    })
                  }
                </ul>
                <Link to='/account/addressbook/new'><button>Add New Address</button></Link>
            </div>
        </div>
      )
    }
}

const mapStateToProps = ({ addresses, auth }) => {
    return { addresses, auth };
};

const mapDispatch = (dispatch)=> {
    return {
        fetchAddresses: () => dispatch(fetchAddresses()),
        deleteAddress: (address) => dispatch(deleteAddress(address))
    };
};


export default connect(mapStateToProps, mapDispatch)(AddressBook);