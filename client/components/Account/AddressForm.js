import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createAddress } from '../../store';
import { Link } from 'react-router-dom';

class AddressForm extends Component {
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
    save(ev) {
        ev.preventDefault();
        const newAddress = {
            userId: this.props.auth.id,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address,
            city: this.state.city,
            state: this.state.state,
            zipCode: this.state.zipCode,
            country: this.state.country
        };
        this.props.createAddress(newAddress);
    }
    render() {
        const { firstName, lastName, address, city, state, zipCode, country } = this.state;
        const { save } = this;
        return (
            <div style={{ maxWidth: '800px', width: '50%', dislay: 'block', margin: '0 auto' }}>
                <h4>Add an Address</h4>
                <form onSubmit={ save }>
                    <div>
                        <p style={{ marginBottom: 0 }}>First Name</p>
                        <input value={ firstName } onChange={ ev => this.setState({ firstName: ev.target.value })}></input><br />
                    </div>
                    <div>
                        <p style={{ marginBottom: 0 }}>Last Name</p>
                        <input value={ lastName } onChange={ ev => this.setState({ lastName: ev.target.value })}></input><br />
                    </div>
                    <div>
                        <p style={{ marginBottom: 0 }}>Street Address</p>
                        <input value={ address } onChange={ ev => this.setState({ address: ev.target.value })}></input><br />
                    </div>
                    <div>
                        <p style={{ marginBottom: 0 }}>City</p>
                        <input value={ city } onChange={ ev => this.setState({ city: ev.target.value })}></input><br />
                    </div>
                    <div>
                        <p style={{ marginBottom: 0 }}>State</p>
                        <input value={ state } onChange={ ev => this.setState({ state: ev.target.value })}></input><br />
                    </div>
                    <div>
                        <p style={{ marginBottom: 0 }}>Zip Code</p>
                        <input value={ zipCode } onChange={ ev => this.setState({ zipCode: ev.target.value })}></input><br />
                    </div>
                    <div>
                        <p style={{ marginBottom: 0 }}>Country</p>
                        <input value={ country } onChange={ ev => this.setState({ country: ev.target.value })}></input><br />
                    </div>
                    <div>
                        <Link to='/account/addressbook'><button>Cancel</button></Link>
                        <button disabled={ !firstName || !lastName || !address || !city || !state || !zipCode || !country}>Save</button>
                    </div>
                </form>
            </div>

        )
    }
};

const mapDispatchToProps = (dispatch, { history }) => {
    return {
        createAddress: (address) => dispatch(createAddress(address, history))
    }
}

export default connect(state => state, mapDispatchToProps)(AddressForm);