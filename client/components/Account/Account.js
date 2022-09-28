import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUser, logout } from '../../store/auth';
import { Link, Route, HashRouter as Router } from 'react-router-dom';
import './Account.css';

class Account extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            avatar: ''
        }
        this.save = this.save.bind(this);
    }
    componentDidMount() {
        this.setState({
            username: this.props.auth.username,
            firstName: this.props.auth.firstName,
            lastName: this.props.auth.lastName,
            email: this.props.auth.email,
            avatar: this.props.auth.avatar
        })
        this.el.addEventListener('change', ev => {
            const file = ev.target.files[0];
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                this.setState({ avatar: reader.result });
            })
            reader.readAsDataURL(file);
        })
    }
    componentDidUpdate(prevProps) {
        if(!prevProps.auth.id && this.props.auth.id) {
            this.setState({
                username: this.props.auth.userName,
                firstName: this.props.auth.firstName,
                lastName: this.props.auth.lastName,
                email: this.props.auth.email,
                avatar: this.props.auth.avatar
            })
        }
    }
    save(ev) {
        ev.preventDefault();
        const user = {
            id: this.props.auth.id,
            username: this.state.username,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            avatar: this.state.avatar
        }
        console.log(this.props)
        this.props.update(user);
    }
    render() {
        const { username, firstName, lastName, email, avatar } = this.state;
        const { save } = this;
        const { logout } = this.props;
        return (
            <div className=''>
                <div className="breadcrumb-section breadcrumb-bg">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 offset-lg-2 text-center">
                            <div className="breadcrumb-text">
                                <p>Fullstack Foodies</p>
                                <h1>Account Info</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                
                <div className='container'>
                    <div className='col-lg-8 offset-lg-2 text-center'>
                    <div className='section-title'>
                    <form onSubmit={ save } className='flex flex-col w-2/4 m-auto"'>
                        <div>
                            <p>Profile Picture</p>
                        </div>
                        <div>
                        { avatar && <img src={ avatar } style={{ height: 300, width: 300 }} /> }<br />
                        <input className='text-center' type='file' ref={ el => this.el = el }/>
                        </div>
                        <p className='rounded-md m-2 p-2'>Username:</p>
                        <input className='border border-slate-300 rounded-md m-2 p-2' value={ username || '' } onChange={ ev => this.setState({ username: ev.target.value })}></input>
                        <p className='rounded-md m-2 p-2'>First Name:</p>
                        <input className='border border-slate-300 rounded-md m-2 p-2' value={ firstName || '' } onChange={ ev => this.setState({ firstName: ev.target.value })}></input>
                        <p className='rounded-md m-2 p-2'>Last Name:</p>
                        <input className='border border-slate-300 rounded-md m-2 p-2' value={ lastName || ''} onChange={ ev => this.setState({ lastName: ev.target.value })}></input>
                        <p className='rounded-md m-2 p-2'>Email Address:</p>

                        <input className='border border-slate-300 rounded-md m-2 p-2' value={ email || ''} onChange={ ev => this.setState({ email: ev.target.value })}></input><br />
                        
                        
                        <button className='bg-slate-400 rounded-md m-2 p-2 text-white'>Save Changes</button>

                        <div className='bg-slate-400 rounded-md m-2 p-2 text-white'>
                            <Link to='/account/addressbook'>View Saved Addresses</Link>
                        </div>

                    </form>
                </div>
                {/*<div>*/}
                {/*<h2><span>Address Book</span></h2>*/}
                {/*<div>*/}
                {/*    <Link to='/account/addressbook'>Saved Addresses</Link>*/}
                {/*</div>*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*<h2><span>Review Past Orders</span></h2>*/}
                {/*<div>*/}
                {/*    <Link to={'/past-orders'}>Order History</Link>*/}
                {/*</div>*/}
                {/*</div>*/}
                {/*<button onClick={ logout }>Logout</button>*/}
            </div>
            </div>
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state;
};

const mapDispatchToProps = (dispatch, { history }) => {
    return {
        update: (user) => dispatch(updateUser(user)),
        logout: ()=> dispatch(logout(history))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Account);