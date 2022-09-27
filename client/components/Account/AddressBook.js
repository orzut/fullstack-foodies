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
        console.log('im mounting!!!!')
        this.props.fetchAddresses();
        console.log(this.props.auth)
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        if ((prevProps.address.length===0) && (this.props.address.length>0)) {

        }
    }
    deleteAddress(address) {
      this.props.deleteAddress(address);
    }

    render() {
      const { address, auth } = this.props;
      const userAddresses = address ? address.filter(address => address.userId === auth.id) : []
      const { deleteAddress } = this;
      return (
        <div>
            <div>
                  <div>
                      <h1 className='font-bold text-lg'>Address Book</h1>
                      <div>
                          <p>-</p>
                          <p className='font-bold text-lg'>Saved Addresses</p>
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
                                { address.firstName ? this.props.auth.firstName : address.firstName} { address.lastName ? this.props.auth.lastName : address.lastName }<br />
                                { address.street } { `APT ${address.apt}` }<br />
                                { address.city }, { address.state } { address.zipcode }<br />
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

const mapStateToProps = ({ address, auth }) => {
    console.log(address)
    return { address, auth };
};

const mapDispatch = (dispatch)=> {
    return {
        fetchAddresses: () => dispatch(fetchAddresses()),
        deleteAddress: (address) => dispatch(deleteAddress(address))
    };
};


export default connect(mapStateToProps, mapDispatch)(AddressBook);