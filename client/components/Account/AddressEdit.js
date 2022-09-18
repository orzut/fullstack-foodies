import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateAddress, fetchAddresses } from '../../store';
import { Link } from 'react-router-dom';

class AddressEdit extends Component {
    constructor() {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            address: '',
            city: '',
            state: '',
            zipCode: '',
            country: ''
        }
        this.save = this.save.bind(this);
    }
    componentDidMount(){
        this.props.fetchAddresses();
        this.setState({
            firstName: this.props.address.firstName,
            lastName: this.props.address.lastName,
            address: this.props.address.address,
            city: this.props.address.city,
            state: this.props.address.state,
            zipCode: this.props.address.zipCode,
            country: this.props.address.country
        });
    }
    componentDidUpdate(prevProps){
        if(!prevProps.address.id && this.props.address.id) {
            this.setState({
                firstName: this.props.address.firstName,
                lastName: this.props.address.lastName,
                address: this.props.address.address,
                city: this.props.address.city,
                state: this.props.address.state,
                zipCode: this.props.address.zipCode,
                country: this.props.address.country
            });
        }
    }
    save(ev) {
        ev.preventDefault();
        const newAddress = {
            id: this.props.address.id,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address,
            city: this.state.city,
            state: this.state.state,
            zipCode: this.state.zipCode,
            country: this.state.country
        };
        this.props.updateAddress(newAddress);
    }
    render() {
        const { firstName, lastName, address, city, state, zipCode, country } = this.state;
        const { save } = this;
        return (
            <div style={{ maxWidth: '800px', width: '50%', dislay: 'block', margin: '0 auto' }}>
                <h4>Edit an Address</h4>
                <form onSubmit={ save }>
                    <div>
                        <p style={{ marginBottom: 0 }}>First Name</p>
                        <input value={ firstName || '' } onChange={ ev => this.setState({ firstName: ev.target.value })}></input><br />
                    </div>
                    <div>
                        <p style={{ marginBottom: 0 }}>Last Name</p>
                        <input value={ lastName || '' } onChange={ ev => this.setState({ lastName: ev.target.value })}></input><br />
                    </div>
                    <div>
                        <p style={{ marginBottom: 0 }}>Street Address</p>
                        <input value={ address || '' } onChange={ ev => this.setState({ address: ev.target.value })}></input><br />
                    </div>
                    <div>
                        <p style={{ marginBottom: 0 }}>City</p>
                        <input value={ city || '' } onChange={ ev => this.setState({ city: ev.target.value })}></input><br />
                    </div>
                    <div>
                        <p style={{ marginBottom: 0 }}>State</p>
                        <input value={ state || '' } onChange={ ev => this.setState({ state: ev.target.value })}></input><br />
                    </div>
                    <div>
                        <p style={{ marginBottom: 0 }}>Zip Code</p>
                        <input value={ zipCode || '' } onChange={ ev => this.setState({ zipCode: ev.target.value })}></input><br />
                    </div>
                    <div>
                        <p style={{ marginBottom: 0 }}>Country</p>
                        <input value={ country || '' } onChange={ ev => this.setState({ country: ev.target.value })}></input><br />
                    </div>
                    <div>
                        <Link to='/account/addressbook'><button >Cancel</button></Link>
                        <button disabled={ !firstName || !lastName || !address || !city || !state || !zipCode || !country}>Save</button>
                    </div>
                </form>
            </div>
        )
    }
};

const mapStateToProps = ({ addresses }, ownProps) => {
    const id = ownProps.match.params.id;
    const address = addresses.find( address => address.id === id * 1 ) || {};
    return {
        address
    };
}

const mapDispatchToProps = (dispatch, { history }) => {
    return {
        fetchAddresses: () => dispatch(fetchAddresses()),
        updateAddress: (address) => dispatch(updateAddress(address, history))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddressEdit);